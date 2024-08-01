using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class Booking
    {
        public Booking()
        {
            Payments = new HashSet<Payment>();
        }

        public int BookingId { get; set; }
        public int? BusId { get; set; }
        public int? ScheduleId { get; set; }
        public int? UserId { get; set; }
        public int TotalSeats { get; set; }
        public string SeatNumbers { get; set; } = null!;
        public decimal TotalCost { get; set; }
        public DateTime BookingDate { get; set; }

        public virtual bus? Bus { get; set; }
        public virtual BusSchedule? Schedule { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
