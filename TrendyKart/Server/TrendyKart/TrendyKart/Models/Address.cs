using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrendyKart.Models
{
    public class Address
    {
        public string username {  get; set; }
        public string country { get; set; }
        public string state { get; set; }
        public string city { get; set; }
        public int pincode { get; set; }
        public string area { get; set; }
    }
}