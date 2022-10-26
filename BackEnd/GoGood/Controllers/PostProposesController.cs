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
    public class PostProposesController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public PostProposesController(GoGoodContext context)
        {
            _context = context;
        }

        // GET: api/PostProposes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostPropose>>> GetPostProposes()
        {
            return await _context.PostProposes.ToListAsync();
        }

        // GET: api/PostProposes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostPropose>> GetPostPropose(int id)
        {
            var postPropose = await _context.PostProposes.FindAsync(id);

            if (postPropose == null)
            {
                return NotFound();
            }

            return postPropose;
        }

        // PUT: api/PostProposes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostPropose(int id, PostPropose postPropose)
        {
            if (id != postPropose.Id)
            {
                return BadRequest();
            }

            _context.Entry(postPropose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostProposeExists(id))
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

        // POST: api/PostProposes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostPropose>> PostPostPropose(PostPropose postPropose)
        {
            _context.PostProposes.Add(postPropose);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostPropose", new { id = postPropose.Id }, postPropose);
        }

        // DELETE: api/PostProposes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostPropose(int id)
        {
            var postPropose = await _context.PostProposes.FindAsync(id);
            if (postPropose == null)
            {
                return NotFound();
            }

            _context.PostProposes.Remove(postPropose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostProposeExists(int id)
        {
            return _context.PostProposes.Any(e => e.Id == id);
        }
    }
}
