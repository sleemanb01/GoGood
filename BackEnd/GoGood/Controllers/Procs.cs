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

                        dPerson.person = tmp;

                        var image = dr.GetValue(3);
                        if (!DBNull.Value.Equals(image))
                        {
                            dPerson.pImage = Encoding.UTF8.GetString((byte[])image);
                        }
                        else
                        {
                            dPerson.pImage = null;
                        }
                    }

                    con.Close();

                    return dPerson;
                }
            }
        }

        public static List<Field> getFieldsByPersonId(int id)
        {

            var fields = new List<Field>();

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

                        fields.Add(tmp);
                    }

                    con.Close();

                    return fields;
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
                        tmp.ReviewerId = dr.GetInt32(2);
                        tmp.ReviewDate = dr.GetDateTime(3);
                        tmp.Review = dr.GetString(4);

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
    }
}