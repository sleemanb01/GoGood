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
    public class PostsController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public PostsController(GoGoodContext context)
        {
            _context = context;
        }

        // POST: api/postPostWGallery
        [HttpPost("postPostWGallery")]
        public async Task<ActionResult<PostWGallery>> postPostWGallery(PostWGallery postWGallery)
        {
            if (postWGallery == null)
            {
                return BadRequest();
            }

            try
            {
                Post tmp = new Post();

                tmp = postWGallery.post;
                tmp.IsDelete = 0;
                tmp.PostStatus = 0;
                _context.Posts.Add(tmp);

                await _context.SaveChangesAsync();

                var res = CreatedAtAction("GetPost", new { id = postWGallery.post.Id }, postWGallery.post);

                if (res.Value == null)
                {
                    return NotFound();
                }

                if (postWGallery.PostGallery.Count > 0)
                {
                    _context.PostGalleries.AddRange(postWGallery.PostGallery);
                    var galleryRes = await _context.SaveChangesAsync();
                }

                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET: api/getPostsByFields
        [HttpGet("getPostsByFields/{ids}")]
        public ActionResult<PostWData> getPostsByFields(string ids)
        {
            if (ids == null)
            {
                return BadRequest();
            }
            if (ids.Length == 0)
            {
                return NoContent();
            }

            ICollection<Post> posts = Procs.getPostsWFieldNames(ids, "getPostsByFields", "@List");
            if (posts.Count > 0)
            {
                return getPostsData(posts);
            }

            return NoContent();
        }

        // GET: api/getPostsByPerson
        [HttpGet("getPostsByPerson/{id}")]
        public ActionResult<PostWData> getPostsByPerson(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }


            ICollection<Post> posts = Procs.getPostsWFieldNames(id, "getPostsByPerson", "@PersonId");

            if (posts.Count > 0)
            {
                return getPostsData(posts);
            }

            return NoContent();
        }

        // GET: api/getPostsByPro
        [HttpGet("getPostsByPro/{id}")]
        public ActionResult<PostWData> getPostsByPro(string id)
        {

            if (id == null)
            {
                return BadRequest();
            }

            ICollection<Post> posts = Procs.getPostsWFieldNames(id, "getPostsByPro", "@ProId");

            if (posts.Count > 0)
            {
                return getPostsData(posts);
            }

            return NoContent();
        }

        private PostWData getPostsData(ICollection<Post> posts)
        {
            var pwd = new PostWData();
            var postIds = "";
            foreach (var p in posts)
            {
                postIds += p.Id + ",";
            }
            var PostProposes = Procs.getProposes(postIds);

            var PostGallery = Procs.getGallery(postIds);

            var proIds = "";
            foreach (var p in PostProposes)
            {
                proIds += p.Id + ",";
            }

            var professionalProposers = Procs.getDPeople(proIds);

            pwd.posts = posts;
            pwd.professionalProposers = professionalProposers;
            pwd.PostProposes = PostProposes;
            pwd.PostGallery = PostGallery;

            return pwd;
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}
