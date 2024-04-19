using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrendyKart.Models
{
    public class User
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}