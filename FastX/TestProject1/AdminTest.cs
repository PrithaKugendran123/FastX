using FastX.Controllers;
using FastX.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TestProject1
{
    public class Tests
    {
        private IConfigurationRoot config;
        
        [SetUp]
        
        public void Setup()
        {
            config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        }
        [Test]
        public void GetAdmin()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;

            using (var context = new FastXContext(options))
            {
                context.Database.EnsureCreated();
                var proCtr = new AdministratorsController(context);

                var newPro = new Administrator() { Email = "atharva@gmail.com", Password = "atharva12", Role = "Admin" };

                proCtr.PostAdministrator(newPro);

                var actPro = context.Administrators.FirstOrDefault(p => p.Email == "atharva@gmail.com");

                Assert.IsNotNull(actPro);
                Assert.AreEqual(newPro.Email, actPro.Email);
                Assert.AreEqual(newPro.Password, actPro.Password);
                Assert.AreEqual(newPro.Role, actPro.Role);

                Assert.Pass();
            }
        }




        [Test]
        public async Task AddAdminTest()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new AdministratorsController(context);
            var newPro = new Administrator() { Email = "shakthi@gmail.com", Password = "shakthi12", Role = "Admin" };
            await Task.Run(() => proCtr.PostAdministrator(newPro));
            var actPro = context.Administrators.FirstOrDefault(p => p.Email== "shakthi@gmail.com");
            proCtr.PostAdministrator(newPro);
            Assert.IsNotNull(actPro);
            Assert.AreEqual(newPro.Email, actPro.Email);
            Assert.AreEqual(newPro.Password, actPro.Password);
            Assert.AreEqual(newPro.Role, actPro.Role);

        }
        [Test]
        public async Task DelAdminTest()
        {

            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new AdministratorsController(context);
            int idToDelete = 1;
            await proCtr.DeleteAdministrator(idToDelete);
            var deletedPro = await context.Administrators.FindAsync(idToDelete);
            Assert.IsNull(deletedPro, "Admin should have been deleted.");
        }
        [Test]
        public async Task PutAdmin()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;

            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new AdministratorsController(context);
            int adminId = 5;
            var updatedAdmin = new Administrator
            {
                AdminId = adminId,
                Email = "IshitaDutta@gmail.com",
                Password = "ishii11",
                Role = "Admin"
            };
            await proCtr.PutAdministrator(adminId, updatedAdmin);
            var retrievedAdmin = await context.Administrators.FindAsync(adminId);
            Assert.IsNotNull(retrievedAdmin);
            Assert.AreEqual("IshitaDutta@gmail.com", retrievedAdmin.Email);
            Assert.AreEqual("ishii11", retrievedAdmin.Password);


        }
        [Test]
        public async Task GetAministratorById()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new AdministratorsController(context);
            int adminId = 4;
            var result = await proCtr.GetAdministrator(adminId);
            Assert.IsInstanceOf<ActionResult<Administrator>>(result);
        }

        

       
    }
}