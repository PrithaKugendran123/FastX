using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class BusOperator
    {
        public BusOperator()
        {
            LoginTables = new HashSet<LoginTable>();
            buses = new HashSet<bus>();
        }

        public int BusOperatorId { get; set; }
        public string Name { get; set; } = null!;
        public string? Gender { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        public virtual ICollection<LoginTable> LoginTables { get; set; }
        public virtual ICollection<bus> buses { get; set; }
    }
}
