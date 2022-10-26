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
    public class ProfessionalInfosController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public ProfessionalInfosController(GoGoodContext context)
        {
            _context = context;
        }

        // GET: api/ProfessionalInfos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfessionalInfo>>> GetProfessionalInfos()
        {
            return await _context.ProfessionalInfos.ToListAsync();
        }

        // GET: api/ProfessionalInfos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfessionalInfo>> GetProfessionalInfo(int id)
        {
            var professionalInfo = await _context.ProfessionalInfos.FindAsync(id);

            if (professionalInfo == null)
            {
                return NotFound();
            }

            return professionalInfo;
        }

        // PUT: api/ProfessionalInfos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessionalInfo(int id, ProfessionalInfo professionalInfo)
        {
            if (id != professionalInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(professionalInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessionalInfoExists(id))
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

        // POST: api/ProfessionalInfos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfessionalInfo>> PostProfessionalInfo(ProfessionalInfo professionalInfo)
        {
            _context.ProfessionalInfos.Add(professionalInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfessionalInfo", new { id = professionalInfo.Id }, professionalInfo);
        }

        // DELETE: api/ProfessionalInfos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessionalInfo(int id)
        {
            var professionalInfo = await _context.ProfessionalInfos.FindAsync(id);
            if (professionalInfo == null)
            {
                return NotFound();
            }

            _context.ProfessionalInfos.Remove(professionalInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfessionalInfoExists(int id)
        {
            return _context.ProfessionalInfos.Any(e => e.Id == id);
        }
    }
}
