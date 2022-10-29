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
    public class FieldsController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public FieldsController(GoGoodContext context)
        {
            _context = context;
        }

        // POST: api/ProfessionalFields/postProfessionalFields
        [HttpPost("postProfessionalFields")]
        public async Task<ActionResult<ProfessionalField[]>> PostProfessionalFields(ProfessionalField[] professionalFields)
        {
            if (professionalFields == null)
            {
                return BadRequest();
            }

            try
            {
                _context.ProfessionalFields.AddRange(professionalFields);

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }

            return professionalFields;

        }
    }
}
