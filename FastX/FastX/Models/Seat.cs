using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class Seat
    {
        public int SeatId { get; set; }
        public int? BusId { get; set; }
        public int SeatNumber { get; set; }
        public bool IsAvailable { get; set; }

        public virtual bus? Bus { get; set; }
    }
}
