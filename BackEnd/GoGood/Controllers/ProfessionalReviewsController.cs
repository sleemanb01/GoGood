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
    public class ProfessionalReviewsController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public ProfessionalReviewsController(GoGoodContext context)
        {
            _context = context;
        }

        // PUT: api/ProfessionalReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfessionalReview(int id, ProfessionalReview professionalReview)
        {
            if (id != professionalReview.Id)
            {
                return BadRequest();
            }

            _context.Entry(professionalReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessionalReviewExists(id))
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

        // POST: api/ProfessionalReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfessionalReview>> PostProfessionalReview(ProfessionalReview professionalReview)
        {
            _context.ProfessionalReviews.Add(professionalReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfessionalReview", new { id = professionalReview.Id }, professionalReview);
        }

        // DELETE: api/ProfessionalReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessionalReview(int id)
        {
            var professionalReview = await _context.ProfessionalReviews.FindAsync(id);
            if (professionalReview == null)
            {
                return NotFound();
            }

            _context.ProfessionalReviews.Remove(professionalReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfessionalReviewExists(int id)
        {
            return _context.ProfessionalReviews.Any(e => e.Id == id);
        }
    }
}
