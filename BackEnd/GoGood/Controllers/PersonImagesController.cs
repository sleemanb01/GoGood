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
    public class PersonImagesController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public PersonImagesController(GoGoodContext context)
        {
            _context = context;
        }

        // GET: api/PersonImages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonImage>>> GetPersonImages()
        {
            return await _context.PersonImages.ToListAsync();
        }

        // GET: api/PersonImages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonImage>> GetPersonImage(int id)
        {
            var personImage = await _context.PersonImages.FindAsync(id);

            if (personImage == null)
            {
                return NotFound();
            }

            return personImage;
        }

        // PUT: api/PersonImages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonImage(int id, PersonImage personImage)
        {
            if (id != personImage.Id)
            {
                return BadRequest();
            }

            _context.Entry(personImage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonImageExists(id))
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

        // POST: api/PersonImages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonImage>> PostPersonImage(PersonImage personImage)
        {
            _context.PersonImages.Add(personImage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonImage", new { id = personImage.Id }, personImage);
        }

        // DELETE: api/PersonImages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonImage(int id)
        {
            var personImage = await _context.PersonImages.FindAsync(id);
            if (personImage == null)
            {
                return NotFound();
            }

            _context.PersonImages.Remove(personImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonImageExists(int id)
        {
            return _context.PersonImages.Any(e => e.Id == id);
        }
    }
}
