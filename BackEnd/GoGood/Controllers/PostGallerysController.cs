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
    public class PostGallerysController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public PostGallerysController(GoGoodContext context)
        {
            _context = context;
        }

        // GET: api/PostGallerys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostGallery>>> GetPostGalleries()
        {
            return await _context.PostGalleries.ToListAsync();
        }

        // GET: api/PostGallerys/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostGallery>> GetPostGallery(int id)
        {
            var postGallery = await _context.PostGalleries.FindAsync(id);

            if (postGallery == null)
            {
                return NotFound();
            }

            return postGallery;
        }

        // PUT: api/PostGallerys/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostGallery(int id, PostGallery postGallery)
        {
            if (id != postGallery.Id)
            {
                return BadRequest();
            }

            _context.Entry(postGallery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostGalleryExists(id))
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

        // POST: api/PostGallerys
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostGallery>> PostPostGallery(PostGallery postGallery)
        {
            _context.PostGalleries.Add(postGallery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostGallery", new { id = postGallery.Id }, postGallery);
        }

        // DELETE: api/PostGallerys/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostGallery(int id)
        {
            var postGallery = await _context.PostGalleries.FindAsync(id);
            if (postGallery == null)
            {
                return NotFound();
            }

            _context.PostGalleries.Remove(postGallery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostGalleryExists(int id)
        {
            return _context.PostGalleries.Any(e => e.Id == id);
        }
    }
}
