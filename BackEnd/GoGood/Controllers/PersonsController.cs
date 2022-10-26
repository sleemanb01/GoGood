using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Data.SqlTypes;

namespace GoGood.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly GoGoodContext _context;
        private readonly ILogger<PersonsController> _logger;

        public PersonsController(ILogger<PersonsController> logger, GoGoodContext context)
        {
            _context = context;
            _logger = logger;
        }

        private bool PersonExists(int id)
        {
            return _context.People.Any(e => e.Id == id);
        }

        // GET: api/Persons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }


        // DELETE: api/Persons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Persons/signInUp
        [HttpPost("signInUp")]
        public ActionResult<PersonWFields> signInUp(GoGood.Models.Person person)
        {
            return getUser(person);
        }

        // POST: api/Persons/putDPerson
        [HttpPost("putDPerson")]
        public ActionResult<DPerson> putDPerson(DPerson dPerson)
        {
            return putUser(dPerson);
        }

        [HttpGet("GetPersonReviews/{id}")]
        public ActionResult<List<ReviewWithPerson>> GetPersonReviews(int id)
        {
            return GetReviews(id);
        }
        List<ReviewWithPerson> GetReviews(int id)
        {
            List<ReviewWithPerson> pwf = new List<ReviewWithPerson>();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;"))
            {
                using (SqlCommand cmd = new SqlCommand("GetReviews", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP
                    while (dr.Read())
                    {
                        var rwp = new ReviewWithPerson();
                        rwp.Id = dr.GetInt32(0);
                        rwp.Review = dr.GetString(1);
                        rwp.ReviewDate = dr.GetDateTime(2);
                        rwp.Uname = dr.GetString(3);
                        var image = dr.GetValue(4);
                        if (!DBNull.Value.Equals(image))
                        {
                            rwp.PersonImage1 = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            rwp.PersonImage1 = null;
                        }
                        pwf.Add(rwp);

                    }
                    con.Close();
                    return pwf;
                }
            }
        }

        PersonWFields getUser(Person person)
        {

            PersonWFields pwf = new PersonWFields();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;"))
            {
                using (SqlCommand cmd = new SqlCommand("signInUp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@uname", person.Uname);
                    cmd.Parameters.AddWithValue("@phone", person.Phone);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    var fetchedPerson = new DPerson();
                    while (dr.Read())
                    {
                        var tmp = new Person();
                        tmp.Id = dr.GetInt32(0);
                        tmp.Uname = dr.GetString(1);
                        tmp.Phone = dr.GetString(2);

                        fetchedPerson.person = tmp;
                        var image = dr.GetValue(3);
                        if (!DBNull.Value.Equals(image))
                        {
                            fetchedPerson.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            fetchedPerson.pImage = null;
                        }
                    }

                    dr.NextResult();

                    List<Field> fields = new List<Field>();

                    while (dr.Read())
                    {
                        fields.Add(new Field
                        {
                            Id = dr.GetInt32(0),
                            FieldName = dr.GetString(1)
                        });
                    }
                    pwf.DPerson = fetchedPerson;
                    pwf.professionalFields = fields;

                    con.Close();

                    return pwf;
                }
            }
        }

        private DPerson putUser(DPerson dPerson)
        {
            var data = dPerson.pImage;
            // byte[] returned = new byte[(data == null) ? 0 : data.Length];
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;"))
            {
                using (SqlCommand cmd = new SqlCommand("putDPerson", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", dPerson.person.Id);
                    cmd.Parameters.AddWithValue("@uname", dPerson.person.Uname);
                    cmd.Parameters.AddWithValue("@phone", dPerson.person.Phone);
                    if (data != null)
                    {
                        byte[] tmp = Encoding.ASCII.GetBytes(data);
                        cmd.Parameters.AddWithValue("@image", tmp);
                    }
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    DPerson dp = new DPerson();
                    while (dr.Read())
                    {
                        var tmp = new Person();
                        tmp.Id = dr.GetInt32(0);
                        tmp.Uname = dr.GetString(1);
                        tmp.Phone = dr.GetString(2);

                        dp.person = tmp;
                        var image = dr.GetValue(3);
                        if (!DBNull.Value.Equals(image))
                        {
                            dp.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            dp.pImage = null;
                        }

                    }
                    con.Close();

                    return dp;
                }
            }
        }

        public async Task<ActionResult<PersonImage>> PostPersonImage(PersonImage personImage)
        {
            _context.PersonImages.Add(personImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonImage", new { id = personImage.Id }, personImage);
        }

    }
}