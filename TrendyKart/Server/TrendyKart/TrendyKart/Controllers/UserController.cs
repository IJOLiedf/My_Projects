using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrendyKart.Models;
using Dapper;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Http.Cors;

namespace TrendyKart.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;
        private static List<User> _users = new List<User>();

        //Get api/User
        public List<User> getUsers()
        {
            SqlConnection con = new SqlConnection(connectionString);
            _users = (List<User>)con.Query<User>("select * from users");
            return _users;
        }

        // POST: api/user
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int maxId = _users.Any() ? _users.Max(p => p.id) : 0;
            user.id = maxId + 1;

            _users.Add(user);
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();
            con.Query("insert into users values(@userName,@email,@password)", user);
            con.Close();

            return CreatedAtRoute("DefaultApi", new { id = user.id }, user);
        }
    }
}
