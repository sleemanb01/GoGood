using GoGood.Models;
using System.Data.SqlClient;
using System.Data;
using System.Text;

namespace GoGood
{
    public class Procs
    {
        public static string conStr = "Server=localhost;Database=GoGood;Trusted_Connection=False;password=1234;user=sa1;";

        public static DPerson getUser(Person person)
        {

            DPerson dPerson = new DPerson();
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("signInUp", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@uname", person.Uname);
                    cmd.Parameters.AddWithValue("@phone", person.Phone);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var tmp = new Person();
                        tmp.Id = dr.GetInt32(0);
                        tmp.Uname = dr.GetString(1);
                        tmp.Phone = dr.GetString(2);
                        var isAngel = dr.GetValue(3);
                        if (!DBNull.Value.Equals(isAngel))
                        {
                            tmp.IsAngel = Convert.ToBoolean(isAngel);
                        }
                        else
                        {
                            tmp.IsAngel = null;
                        }

                        var image = dr.GetValue(4);
                        if (!DBNull.Value.Equals(image))
                        {
                            dPerson.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            dPerson.pImage = null;
                        }

                        dPerson.person = tmp;
                    }

                    con.Close();

                    return dPerson;
                }
            }
        }

        public static List<Field> getFieldsByPersonId(int id)
        {

            var pf = new List<Field>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getFieldsByPersonId", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@personId", id);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var tmp = new Field();
                        tmp.Id = dr.GetInt32(0);
                        tmp.FieldName = dr.GetString(1);
                        pf.Add(tmp);
                    }

                    con.Close();

                    return pf;
                }
            }
        }

        public static DPerson putUser(DPerson dPerson)
        {
            var data = dPerson.pImage;

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("putDPerson", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", dPerson.person.Id);
                    cmd.Parameters.AddWithValue("@uname", dPerson.person.Uname);
                    cmd.Parameters.AddWithValue("@phone", dPerson.person.Phone);
                    cmd.Parameters.AddWithValue("@isAngel", dPerson.person.IsAngel);
                    if (data != null)
                    {
                        byte[] tmp = Encoding.ASCII.GetBytes(data);
                        cmd.Parameters.AddWithValue("@image", tmp);
                    }
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    DPerson dp = new DPerson();
                    while (dr.Read())
                    {
                        var tmp = new Person();
                        tmp.Id = dr.GetInt32(0);
                        tmp.Uname = dr.GetString(1);
                        tmp.Phone = dr.GetString(2);
                        var isAngel = dr.GetValue(3);
                        if (!DBNull.Value.Equals(isAngel))
                        {
                            tmp.IsAngel = Convert.ToBoolean(isAngel);
                        }
                        else
                        {
                            tmp.IsAngel = null;
                        }

                        dp.person = tmp;
                        var image = dr.GetValue(4);
                        if (!DBNull.Value.Equals(image))
                        {
                            dp.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            dp.pImage = null;
                        }

                    }
                    con.Close();

                    return dp;
                }
            }
        }

        public static List<ProfessionalReview> getReviews(int id)
        {
            List<ProfessionalReview> pr = new List<ProfessionalReview>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getReviews", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP
                    while (dr.Read())
                    {

                        var tmp = new ProfessionalReview();
                        tmp.Id = dr.GetInt32(0);
                        tmp.ProfessionalId = dr.GetInt32(1);
                        tmp.PostId = dr.GetInt32(2);
                        tmp.ReviewerId = dr.GetInt32(3);
                        tmp.ReviewDate = dr.GetDateTime(4);
                        tmp.Review = dr.GetString(5);

                        pr.Add(tmp);

                    }
                    con.Close();

                    return pr;
                }
            }
        }

        public static List<DPerson> getDPeople(string ids)
        {
            List<DPerson> final = new List<DPerson>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getDPeople", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@List", ids);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP
                    while (dr.Read())
                    {
                        DPerson dp = new DPerson();
                        var tmp = new Person();
                        tmp.Id = dr.GetInt32(0);
                        tmp.Uname = dr.GetString(1);
                        tmp.Phone = dr.GetString(2);
                        var isAngel = dr.GetValue(3);
                        if (!DBNull.Value.Equals(isAngel))
                        {
                            tmp.IsAngel = Convert.ToBoolean(dr.GetInt32(3));
                        }
                        else
                        {
                            tmp.IsAngel = null;
                        }

                        dp.person = tmp;
                        var image = dr.GetValue(3);
                        if (!DBNull.Value.Equals(image))
                        {
                            dp.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            dp.pImage = null;
                        }
                        final.Add(dp);

                    }
                    con.Close();

                    return final;
                }
            }
        }

        // ************************************************** POSTS

        public static ICollection<Post> getPosts(string ids, string proc, string param)
        {

            var posts = new List<Post>();
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(proc, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue(param, ids);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var post = new Post();
                        post.Id = dr.GetInt32(0);
                        post.PostTitle = dr.GetString(1);
                        post.PostDescription = dr.GetString(2);
                        post.PostDate = dr.GetDateTime(3);
                        post.PersonId = dr.GetInt32(4);
                        post.PostLng = dr.GetDouble(5);
                        post.PostLat = dr.GetDouble(6);
                        var pId = dr.GetValue(7);
                        if (!DBNull.Value.Equals(pId))
                        {
                            post.ProffessionalId = dr.GetInt32(7);
                        }
                        else
                        {
                            post.ProffessionalId = null;
                        }
                        post.PostStatus = dr.GetInt32(8);
                        post.FieldId = dr.GetInt32(9);

                        posts.Add(post);
                    }

                    con.Close();

                    return posts;
                }
            }
        }

        public static ICollection<PostPropose> getProposes(string postIds)
        {
            var proposes = new List<PostPropose>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getProposes", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@List", postIds);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var propose = new PostPropose();
                        propose.Id = dr.GetInt32(0);
                        propose.ProffessionalId = dr.GetInt32(1);
                        propose.PostId = dr.GetInt32(2);

                        proposes.Add(propose);
                    }

                    con.Close();

                    return proposes;
                }
            }
        }

        public static ICollection<DPostGallery> getGallery(string postIds)
        {
            var galleries = new List<DPostGallery>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getGallery", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@List", postIds);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var gallery = new DPostGallery();
                        gallery.Id = dr.GetInt32(0);
                        gallery.PostId = dr.GetInt32(1);
                        var tmp = dr.GetValue(2);
                        if (!DBNull.Value.Equals(tmp))
                        {
                            gallery.DGallery = Encoding.UTF8.GetString((byte[])tmp);
                        }
                        else
                        {
                            gallery.DGallery = null;
                        }

                        galleries.Add(gallery);
                    }

                    con.Close();

                    return galleries;
                }
            }
        }

        public static ICollection<DPerson> getProfessionalProposers(string proIds)
        {
            var pp = new List<DPerson>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("getDPeople", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@List", proIds);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader(); // running the SP

                    while (dr.Read())
                    {
                        var person = new DPerson();
                        person.person.Id = dr.GetInt32(0);
                        person.person.Uname = dr.GetString(1);
                        person.person.Phone = dr.GetString(2);
                        var tmp = dr.GetValue(3);
                        if (!DBNull.Value.Equals(tmp))
                        {
                            person.pImage = Encoding.UTF8.GetString((byte[])tmp);
                        }
                        else
                        {
                            person.pImage = null;
                        }

                        pp.Add(person);
                    }

                    con.Close();

                    return pp;
                }
            }
        }

    }
}