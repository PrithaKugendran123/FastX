using System;
using System.Collections.Generic;

namespace FastX.Models
{
    public partial class Administrator
    {
        public Administrator()
        {
            LoginTables = new HashSet<LoginTable>();
        }

        public int AdminId { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        public virtual ICollection<LoginTable> LoginTables { get; set; }
    }
}
