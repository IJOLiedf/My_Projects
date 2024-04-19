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

    public class CartController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnectionString"].ConnectionString;
        [HttpPost]
        //Post api/cart
        public void Post(Cart obj)
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "insert into cart values(@username,@id,@name,@price,@photo,@category)";
            con.Query(sql, obj);
        }
        [HttpGet]
        //Get api/cart
        public IEnumerable<Cart> getLikes()
        {
            SqlConnection con = new SqlConnection(connectionString);
            string sql = "select * from cart";
            IEnumerable<Cart> result = con.Query<Cart>(sql);
            return result;
        }
        [HttpDelete]
        public void Delete(int id)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Query("delete from cart where id=@id", new { id = id });
        }

        [HttpGet]
        [Route("api/cart/productscount")]
        //Get api/cart/productscount
        public int GetLikesCount(string username)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string sql = "SELECT COUNT(*) FROM cart WHERE Username = @Username";
                return con.QuerySingle<int>(sql, new { Username = username });
            }
        }
        [HttpPost]
        [Route("api/address")]
        public void postAddress(Address ad)
        {
            SqlConnection con = new SqlConnection( connectionString);
            con.Query("insert into address values(@username,@country,@state,@city,@pincode,@area)", ad);
        }
        [HttpGet]
        [Route("api/cartproducts")]
        public IEnumerable<Cart> cartProducts()
        {
            SqlConnection con = new SqlConnection(connectionString);
            IEnumerable<Cart> res=  con.Query<Cart>("select * from cart");
            return res;
        }

        [HttpPost]
        [Route("api/orders")]
        public void postOrders(Orders obj)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Query("insert into orders values(@username,@product_name,@price,@id,@photo)", obj);
        }
        [HttpDelete]
        [Route("api/delCartItemOfUser")]
        public void deleteOrders(string username)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Query("delete from cart where username=@username", new { username = username });
        }
        [HttpGet]
        [Route("api/userOrdersCount")]
        public int ordersCount(string username)
        {
            SqlConnection con = new SqlConnection(connectionString);
            int count=con.QuerySingle<int>("select count(*) from orders where username=@username",new { username = username }); 
            return count;
        }

        [HttpGet]
        [Route("api/userOrders")]
        public IEnumerable<Orders> userOrders(string username)
        {
            SqlConnection con = new SqlConnection( connectionString);
           IEnumerable<Orders> res= con.Query<Orders>("select * from orders where username=@username",new { username = username }); 
            return res;
        }

        [HttpGet]
        [Route("api/cartProductsCount")]
        public int cartProductsCount(string username)
        {
            SqlConnection con = new SqlConnection(connectionString);
            int count = con.QuerySingle<int>("select count(*) from cart where username=@username", new { username = username });
            return count;
        }
        [HttpGet]
        [Route("api/getgmail")]
        public string getmail(string username)
        {
           SqlConnection con = new SqlConnection(connectionString);
           string res= con.QuerySingle<string>("select email from users where username=@username", new { username = username });
           return res;
        }

    }
}
