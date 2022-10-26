using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoGood.Models;
using System.Data.SqlClient;
using System.Data;
using System.Text;

namespace GoGood.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly GoGoodContext _context;
        private readonly ILogger<PostsController> _logger;

        public PostsController(GoGoodContext context,
                                        ILogger<PostsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            if (post == null)
            {
                return BadRequest();
            }
            post.IsDelete = 0;
            post.PostStatus = 0;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
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

            return GetPostsWFieldNames(ids, "getPostsByFields", "@List");
        }

        // GET: api/Posts/getPostsByPerson
        [HttpGet("getPostsByPerson/{id}")]
        public ActionResult<PostWData> getPostsByPerson(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            if (id.Length == 0)
            {
                return NoContent();
            }

            return GetPostsWFieldNames(id, "getPostsByPerson", "@PersonId");
        }

        // GET: api/Posts/getPostsByPro
        [HttpGet("getPostsByPro/{id}")]
        public ActionResult<PostWData> getPostsByPro(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            if (id.Length == 0)
            {
                return NoContent();
            }

            return GetPostsWFieldNames(id, "getPostsByPro", "@ProId");
        }

        // Posts/putStatus

        PostWData GetPostsWFieldNames(string ids, string proc, string param)
        {

            var pwd = new PostWData();
            using (SqlConnection con = new SqlConnection("Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;"))
            {
                using (SqlCommand cmd = new SqlCommand(proc, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue(param, ids);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    var dPosts = new List<DPost>();
                    var field = new Field();
                    var professionalProposers = new List<DPerson>();
                    var postProposes = new List<PostPropose>();
                    var postGallery = new List<PostGallery>();

                    while (dr.Read())
                    {
                        var dPost = new DPost();
                        dPost.Id = dr.GetInt32(0);
                        dPost.PostTitle = dr.GetString(1);
                        dPost.PostDescription = dr.GetString(2);
                        dPost.PostDate = dr.GetDateTime(3);
                        dPost.PersonId = dr.GetInt32(4);
                        dPost.PostLng = dr.GetDouble(5);
                        dPost.PostLat = dr.GetDouble(6);
                        var pId = dr.GetValue(7);
                        if (!DBNull.Value.Equals(pId))
                        {
                            dPost.ProffessionalId = dr.GetInt32(7);
                        }
                        else
                        {
                            dPost.ProffessionalId = null;
                        }
                        dPost.PostStatus = dr.GetInt32(8);
                        dPost.field.Id = dr.GetInt32(9);
                        dPost.field.FieldName = dr.GetString(10);

                        dPosts.Add(dPost);
                    }

                    if (dr.NextResult())
                    {
                        while (dr.Read())
                        {
                            var person = new Person();
                            person.Id = dr.GetInt32(0);
                            person.Uname = dr.GetString(1);
                            person.Phone = dr.GetString(2);

                            var dPerson = new DPerson();
                            dPerson.person = person;
                            var image = dr.GetValue(3);

                            if (!DBNull.Value.Equals(image))
                            {
                                dPerson.pImage = Encoding.UTF8.GetString((byte[])image);
                            }
                            else
                            {
                                dPerson.pImage = null;
                            }

                            professionalProposers.Add(dPerson);
                        }
                    }

                    if (dr.NextResult())
                    {
                        while (dr.Read())
                        {
                            postProposes.Add(new PostPropose
                            {
                                Id = dr.GetInt32(0),
                                ProffessionalId = dr.GetInt32(1),
                                PostId = dr.GetInt32(2)

                            });
                        }
                    }

                    if (dr.NextResult())
                    {
                        while (dr.Read())
                        {
                            var pG = new PostGallery();

                            pG.Id = dr.GetInt32(0);
                            pG.PostId = dr.GetInt32(1);

                            if (!DBNull.Value.Equals(dr.GetValue(2)))
                            {
                                pG.Gallery = (byte[])dr.GetValue(2);
                            }
                            else
                            {
                                pG.Gallery = null;
                            }

                            postGallery.Add(pG);

                        }
                    }

                    pwd.dPosts = dPosts;
                    pwd.professionalProposers = professionalProposers;
                    pwd.PostProposes = postProposes;
                    pwd.PostGallery = postGallery;

                    con.Close();

                    return pwd;
                }
            }
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

                Post post = (Post)res.Value;

                var gallery = postWGallery.PostGallery;
                foreach (var item in gallery)
                {
                    item.PostId = post.Id;
                    var galleryRes = await PostPostGallery(item);
                }

                return NoContent();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<ActionResult<PostGallery>> PostPostGallery(PostGallery postGallery)
        {
            _context.PostGallery.Add(postGallery);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetPostGallery", new { id = postGallery.Id }, postGallery);
        }
    }
}