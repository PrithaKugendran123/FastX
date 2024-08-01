using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class User
    {
        public User()
        {
            Bookings = new HashSet<Booking>();
            LoginTables = new HashSet<LoginTable>();
        }

        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string? Gender { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<LoginTable> LoginTables { get; set; }
    }
}
