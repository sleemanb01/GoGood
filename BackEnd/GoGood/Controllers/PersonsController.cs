using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;
using System.Text;


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

        // POST: api/Persons/signInUp
        [HttpPost("signInUp")]
        public ActionResult<PersonWFields> signInUp(Person person)
        {
            var pwf = new PersonWFields();

            try
            {
                var dPerson = Procs.getUser(person);

                if (DBNull.Value.Equals(dPerson))
                {
                    return NotFound();
                }

                pwf.DPerson = dPerson;

                var pf = new List<Field>();
                pf = Procs.getFieldsByPersonId(dPerson.person.Id);

                pwf.fields = pf;

                return pwf;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST: api/Persons/putDPerson
        [HttpPost("putDPerson")]
        public ActionResult<DPerson> putDPerson([FromBody] DPerson dPerson)
        {
            return Procs.putUser(dPerson);
        }

        // GET: api/Persons/GetPersonReviews
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
