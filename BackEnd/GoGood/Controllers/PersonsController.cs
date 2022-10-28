using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;


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
        public ActionResult<PersonWFields> signInUp(Person person)
        {
            var pwf = new PersonWFields();

            try
            {
                var dPerson = new DPerson();
                pwf.DPerson = Procs.getUser(person);

                var fields = new List<Field>();
                fields = Procs.getFieldsByPersonId(dPerson.person.Id);

                pwf.professionalFields = fields;

                return pwf;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST: api/Persons/putDPerson
        [HttpPost("putDPerson")]
        public ActionResult<DPerson> putDPerson(DPerson dPerson)
        {
            return Procs.putUser(dPerson);
        }

        [HttpGet("GetPersonReviews/{id}")]
        public ActionResult<ReviewWithPerson> GetPersonReviews(int id)
        {
            var rp = new ReviewWithPerson();

            try
            {
                var reviews = Procs.getReviews(id);
                rp.professionalReviews = reviews.ToList();

                var ids = "";
                foreach (var r in reviews)
                {
                    ids += r.ReviewerId + ",";
                }

                var people = Procs.getDPeople(ids);

                return rp;
            }
            catch (Exception e)
            {
                throw e;
            }


        }
    }
}
