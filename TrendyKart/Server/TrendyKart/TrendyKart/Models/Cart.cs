using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrendyKart.Models
{
    public class Cart
    {
        public string username { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public float price { get; set; }
        public string photo { get; set; }
        public string category { get; set; }
    }
}