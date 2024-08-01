using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class BusSchedule
    {
        public BusSchedule()
        {
            Bookings = new HashSet<Booking>();
        }

        public int ScheduleId { get; set; }
        public int? BusId { get; set; }
        public TimeSpan DepartureTime { get; set; }
        public TimeSpan ArrivalTime { get; set; }
        public decimal Fare { get; set; }

        public virtual bus? Bus { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
