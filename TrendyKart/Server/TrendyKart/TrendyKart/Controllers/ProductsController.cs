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
    public class ProductsController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;

        //Get api/products
        public IEnumerable<Products> getUsers()
        {
            SqlConnection con = new SqlConnection(connectionString);
            IEnumerable<Products> result =con.Query<Products>("select * from products");
            return result;
        }

        

    }
}
