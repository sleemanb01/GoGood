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
    public class PostsController : ControllerBase
    {
        private readonly GoGoodContext _context;

        public PostsController(GoGoodContext context)
        {
            _context = context;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost([FromRoute] int id, [FromBody] Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            post.IsDelete = 0;

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: api/Posts/postPostWGallery
        [HttpPost("postPostWGallery")]
        public async Task<ActionResult<PostWGallery>> postPostWGallery(PostWGallery postWGallery)
        {
            if (postWGallery == null)
            {
                return BadRequest();
            }

            try
            {
                Post post = new Post();

                post = postWGallery.post;
                post.IsDelete = 0;
                post.PostStatus = 2;
                _context.Posts.Add(post);

                await _context.SaveChangesAsync();

                var res = CreatedAtAction("GetPost", new { id = postWGallery.post.Id }, postWGallery.post);

                if (res.Value == null)
                {
                    return NotFound();
                }

                var uploadedPost = (Post)res.Value;

                if (postWGallery.DPostGallery.Count > 0)
                {
                    var data = postWGallery.DPostGallery;
                    var byteArr = new List<PostGallery>();

                    for (var i = 0; i < data.Count; i++)
                    {
                        var element = data.ElementAt(i).DGallery;
                        if (element != null)
                        {
                            PostGallery pg = new PostGallery();
                            pg.Gallery = Encoding.ASCII.GetBytes(element);
                            pg.PostId = uploadedPost.Id;
                            byteArr.Add(pg);
                        }

                    }

                    _context.PostGalleries.AddRange(byteArr);
                    var galleryRes = await _context.SaveChangesAsync();
                }

                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET: api/Posts/getPostsByFields
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

            ICollection<Post> posts = Procs.getPosts(ids, "getPostsByFields", "@List");
            if (posts.Count > 0)
            {
                return getPostsData(posts);
            }

            return NoContent();
        }

        // GET: api/Posts/getPostsByPerson
        [HttpGet("getPostsByPerson/{id}")]
        public ActionResult<PostWData> getPostsByPerson(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }


            ICollection<Post> posts = Procs.getPosts(id, "getPostsByPerson", "@PersonId");

            if (posts.Count > 0)
            {
                return getPostsData(posts);
            }

            return NoContent();
        }

        // GET: api/Posts/getPostsByPro
        [HttpGet("getPostsByPro/{id}")]
        public ActionResult<PostWData> getPostsByPro(string id)
        {

            if (id == null)
            {
                return BadRequest();
            }

            ICollection<Post> posts = Procs.getPosts(id, "getPostsByPro", "@ProId");

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

            var DPostGallery = Procs.getGallery(postIds);

            var proIds = "";
            foreach (var p in PostProposes)
            {
                proIds += p.ProffessionalId + ",";
            }

            var professionalProposers = Procs.getDPeople(proIds);

            pwd.Posts = posts;
            pwd.ProfessionalProposers = professionalProposers;
            pwd.PostProposes = PostProposes;
            pwd.DPostGallery = DPostGallery;

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
