using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class LoginTable
    {
        public int LoginId { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        public int? BusOperatorId { get; set; }
        public int? UserId { get; set; }
        public int? AdminId { get; set; }

        public virtual Administrator? Admin { get; set; }
        public virtual BusOperator? BusOperator { get; set; }
        public virtual User? User { get; set; }
    }
}
