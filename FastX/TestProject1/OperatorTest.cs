using FastX.Controllers;
using FastX.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TestProject1
{
    public class Testsop
    {
        private IConfigurationRoot config;

        [SetUp]

        public void Setup()
        {
            config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        }

        [Test]
        public void GetOperator()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;

            using (var context = new FastXContext(options))
            {
                context.Database.EnsureCreated();
                var proCtr = new BusOperatorsController(context);

                var newPro = new BusOperator() { Name = "Dhruv", Gender = "Male", ContactNumber = "939474834", Address = "Cochi,Kerala", Email = "dhruv@gmail.com", Password = "dhruv12", Role = "Operator" };

                proCtr.PostBusOperator(newPro);

                var actPro = context.BusOperators.FirstOrDefault(p => p.Email == "dhruv@gmail.com");

                Assert.IsNotNull(actPro);
                Assert.AreEqual(newPro.Name, actPro.Name);
                Assert.AreEqual(newPro.Gender, actPro.Gender);
                Assert.AreEqual(newPro.ContactNumber, actPro.ContactNumber);
                Assert.AreEqual(newPro.Address, actPro.Address);
                Assert.AreEqual(newPro.Email, actPro.Email);
                Assert.AreEqual(newPro.Password, actPro.Password);
                Assert.AreEqual(newPro.Role, actPro.Role);

                Assert.Pass();
            }
        }

        [Test]
        public async Task AddOpTest()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusOperatorsController(context);
            var newPro = new BusOperator() { Name = "Theeban", Gender = "Male", ContactNumber = "939474834", Address = "Cochi,Kerala", Email = "theeban@gmail.com", Password = "theeban12", Role = "Operator" };
            await Task.Run(() => proCtr.PostBusOperator(newPro));
            var actPro = context.BusOperators.FirstOrDefault(p => p.Email == "theeban@gmail.com");
            proCtr.PostBusOperator(newPro);
            Assert.IsNotNull(actPro);
            Assert.AreEqual(newPro.Name, actPro.Name);
            Assert.AreEqual(newPro.Gender, actPro.Gender);
            Assert.AreEqual(newPro.ContactNumber, actPro.ContactNumber);
            Assert.AreEqual(newPro.Address, actPro.Address);
            Assert.AreEqual(newPro.Email, actPro.Email);
            Assert.AreEqual(newPro.Password, actPro.Password);
            Assert.AreEqual(newPro.Role, actPro.Role);

        }

        [Test]
        public async Task DelAdTest()
        {

            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusOperatorsController(context);
            int idToDelete = 1;
            await proCtr.DeleteBusOperator(idToDelete);
            var deletedPro = await context.BusOperators.FindAsync(idToDelete);
            Assert.IsNull(deletedPro, "Bus operator should have been deleted.");
        }
        [Test]
        public async Task UpdateOperator()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;

            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusOperatorsController(context);
            int operatorId = 5;
            var updatedOp = new BusOperator
            {
                BusOperatorId = operatorId,
                Name = "Kayal",
                Gender = "Male",
                ContactNumber = "932374834",
                Address = "Mumbai,Maharashtra",
                Email = "kayal@gmail.com",
                Password = "kayal12",
                Role = "Operator"
            };
            await proCtr.PutBusOperator(operatorId, updatedOp);
            var retrievedOp = await context.BusOperators.FindAsync(operatorId);
            Assert.IsNotNull(retrievedOp);
            Assert.AreEqual("kayal@gmail.com", retrievedOp.Email);
            Assert.AreEqual("kayal12", retrievedOp.Password);


        }
        [Test]
        public async Task GetOperatorById()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusOperatorsController(context);
            int adminId = 4;
            var result = await proCtr.GetBusOperator(adminId);
            Assert.IsInstanceOf<ActionResult<BusOperator>>(result);
        }

       
    }
}