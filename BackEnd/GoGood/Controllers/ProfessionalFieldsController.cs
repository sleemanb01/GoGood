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

        // GET: api/ProfessionalFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessionalField>>> GetProfessionalFields()
        {
            return await _context.ProfessionalFields.ToListAsync();
        }

        // GET: api/ProfessionalFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfessionalField>> GetProfessionalField(int id)
        {
            var professionalField = await _context.ProfessionalFields.FindAsync(id);

            if (professionalField == null)
            {
                return NotFound();
            }

            return professionalField;
        }

        // PUT: api/ProfessionalFields/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessionalField(int id, ProfessionalField professionalField)
        {
            if (id != professionalField.Id)
            {
                return BadRequest();
            }

            _context.Entry(professionalField).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessionalFieldExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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

        // DELETE: api/ProfessionalFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessionalField(int id)
        {
            var professionalField = await _context.ProfessionalFields.FindAsync(id);
            if (professionalField == null)
            {
                return NotFound();
            }

            _context.ProfessionalFields.Remove(professionalField);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfessionalFieldExists(int id)
        {
            return _context.ProfessionalFields.Any(e => e.Id == id);
        }
    }
}
