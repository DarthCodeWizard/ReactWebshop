using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Oktatas.Models
{
    public class ProductVM
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public int CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string ManufacturerName { get; set; }

        public string Color { get; set; }

        public int Price { get; set; }

        public string Currency { get; set; }

        public int Count { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public int VisitCount { get; set; }

        public int ManufactureId { get; set; }
    }
}