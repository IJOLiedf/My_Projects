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
    public class FashionController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;

        //Get api/Fashion
        public IEnumerable<Products> getElectronics()
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "select * from products where category=@Category";
            IEnumerable<Products> result = con.Query<Products>(sql, new { Category = "Fashion" });
            return result;
        }
    }
}
