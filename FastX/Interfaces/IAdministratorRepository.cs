using FastX.Models;

namespace FastX.Interfaces
{
    public interface IAdministratorRepository
    {
        public Administrator? GetAdminById(int id);
        public Administrator? GetAdminByEmail(string email);
        public bool UpdateAdmin(Administrator admin);
        public bool CreateAdmin(Administrator admin);
        public bool DeleteAdmin(int id);
        public bool AdminExists(int? id);
        public bool AdminExists(string email);
        public bool Save();

    }
}
