using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class bus
    {
        public bus()
        {
            Bookings = new HashSet<Booking>();
            BusSchedules = new HashSet<BusSchedule>();
            Seats = new HashSet<Seat>();
        }

        public int BusId { get; set; }
        public int? RouteId { get; set; }
        public int? OperatorId { get; set; }
        public string? BusName { get; set; }
        public string? BusNumber { get; set; }
        public string? SeatType { get; set; }
        public string? BusType { get; set; }
        public int? NumberOfSeats { get; set; }
        public string? PickUp { get; set; }
        public string? DropPoint { get; set; }
        public bool? WaterBottle { get; set; }
        public bool? ChargingPoint { get; set; }
        public bool? Tv { get; set; }
        public bool? Blanket { get; set; }

        public virtual BusOperator? Operator { get; set; }
        public virtual BusRoute? Route { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<BusSchedule> BusSchedules { get; set; }
        public virtual ICollection<Seat> Seats { get; set; }
    }
}
