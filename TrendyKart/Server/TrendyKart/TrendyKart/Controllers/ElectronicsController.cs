using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TrendyKart.Models;
using Dapper;

namespace TrendyKart.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ElectronicsController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;
        [HttpGet] 
        //Get api/Electronics
        public IEnumerable<Products> getElectronics()
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "select * from products where category=@Category";
            IEnumerable<Products> result = con.Query<Products>(sql, new { Category = "Electronics" });
            return result;
        }

        [HttpPost]
        //Post api/Electronics
        public void Post(Likes obj)
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "insert into likes values(@username,@id,@name,@price,@photo,@category,@status)";
            con.Query(sql, obj);
        }
        [HttpGet]
        [Route("api/Electronics/likes")]
        //Get api/Electronics
        public IEnumerable<Likes> getLikes()
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "select * from likes";
            IEnumerable<Likes> result = con.Query<Likes>(sql);
            return result;
        }
        [HttpDelete]
        public void Delete(int id)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Query("delete from likes where id=@id", new { id = id });
        }
        [HttpGet]
        [Route("api/Electronics/likescount")]
        //Get api/Electronics/likescount
        public int GetLikesCount(string username)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string sql = "SELECT COUNT(*) FROM Likes WHERE Username = @Username";
                return con.QuerySingle<int>(sql, new { Username = username });
            }
        }
        
        
    }
}
