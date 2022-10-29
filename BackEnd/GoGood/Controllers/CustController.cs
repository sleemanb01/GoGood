using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;

namespace GoGood.Controllers
{
    [ApiController]
    [Route("api/")]
    public class CusrController : ControllerBase
    {
        private readonly GoGoodContext _context;
        private readonly ILogger<FieldsController> _logger;

        public CusrController(GoGoodContext context,
                                        ILogger<FieldsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // POST: api/signInUp
        [HttpPost("signInUp")]
        public ActionResult<PersonWFields> signInUp(Person person)
        {
            var pwf = new PersonWFields();

            try
            {
                var dPerson = new DPerson();
                pwf.DPerson = Procs.getUser(person);

                var fields = new List<Field>();
                fields = Procs.getFieldsByPersonId(dPerson.person.Id);

                pwf.professionalFields = fields;

                return pwf;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST: api/putDPerson
        [HttpPost("putDPerson")]
        public ActionResult<DPerson> putDPerson(DPerson dPerson)
        {
            return Procs.putUser(dPerson);
        }

        // GET: api/GetPersonReviews
        [HttpGet("GetPersonReviews/{id}")]
        public ActionResult<ReviewWithPerson> GetPersonReviews(int id)
        {
            var rp = new ReviewWithPerson();

            try
            {
                var reviews = Procs.getReviews(id);
                rp.professionalReviews = reviews.ToList();

                var ids = "";
                foreach (var r in reviews)
                {
                    ids += r.ReviewerId + ",";
                }

                var people = Procs.getDPeople(ids);

                return rp;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // ****************************************** POSTS ******************************

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

                var res = CreatedAtAction("GetPostGallery", new { id = postWGallery.post.Id }, postWGallery.post);

                if (res.Value == null)
                {
                    return NotFound();
                }

                _context.PostGalleries.AddRange(postWGallery.PostGallery);
                var galleryRes = await _context.SaveChangesAsync();

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

    }
}