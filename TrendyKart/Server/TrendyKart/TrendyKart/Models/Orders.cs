using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrendyKart.Models
{
    public class Orders
    {
        public string username {  get; set; }
        public string product_name {  get; set; }
        public float price {  get; set; }
        public int id {  get; set; }
        public string photo {  get; set; }
    }
}