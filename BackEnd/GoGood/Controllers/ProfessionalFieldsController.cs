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
    public class ProfessionalFieldsController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public ProfessionalFieldsController(GoGoodContext context)
        {
            _context = context;
        }

        // POST: api/ProfessionalFields
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfessionalField>> PostProfessionalField(ProfessionalField professionalField)
        {
            _context.ProfessionalFields.Add(professionalField);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfessionalField", new { id = professionalField.Id }, professionalField);
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
