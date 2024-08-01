using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class BusRoute
    {
        public BusRoute()
        {
            buses = new HashSet<bus>();
        }

        public int RouteId { get; set; }
        public string Origin { get; set; } = null!;
        public string Destination { get; set; } = null!;
        public DateTime TravelDate { get; set; }

        public virtual ICollection<bus>? buses { get; set; }
    }
}
