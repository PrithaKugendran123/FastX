using FastX.Controllers;
using FastX.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject1
{
    public class TestRoute
    {
        private IConfigurationRoot config;

        [SetUp]

        public void Setup()
        {
            config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        }
        [Test]
        public void GetBusRoutes()
        {

            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusRoutesController(context);
            var newPro = new BusRoute() { Origin = "Chennai", Destination = "Salem", TravelDate = new DateTime(2023, 09, 23) };
            var actPro = context.BusRoutes.FirstOrDefault(p => p.Origin == "Chennai");
            proCtr.PostBusRoute(newPro);
            Assert.IsNotNull(actPro);
            Assert.AreEqual(newPro.Origin, actPro.Origin);
            Assert.AreEqual(newPro.Destination, actPro.Destination);
            Assert.AreEqual(newPro.TravelDate, actPro.TravelDate);
            Assert.Pass();

        }

        [Test]
        public async Task AddRouteTest()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusRoutesController(context);
            var newPro = new BusRoute() { Origin = "Bangalore", Destination = "Trichy", TravelDate = new DateTime(2024, 01, 30) };
            await Task.Run(() => proCtr.PostBusRoute(newPro));
            var actPro = context.BusRoutes.FirstOrDefault(p => p.Origin == "Bangalore");
            proCtr.PostBusRoute(newPro);
            Assert.IsNotNull(actPro);
            Assert.AreEqual(newPro.Origin, actPro.Origin);
            Assert.AreEqual(newPro.Destination, actPro.Destination);
            Assert.AreEqual(newPro.TravelDate, actPro.TravelDate);

        }
        [Test]
        public async Task DelRouteTest()
        {

            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusRoutesController(context);
            int idToDelete = 1;
            await proCtr.DeleteBusRoute(idToDelete);
            var deletedPro = await context.BusRoutes.FindAsync(idToDelete);
            Assert.IsNull(deletedPro, "Bus route should have been deleted.");
        }
        [Test]
        public async Task PutRoute()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;

            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusRoutesController(context);
            int routeId = 5;
            var updatedRoute = new BusRoute
            {
                RouteId = routeId,
                Origin = "Nagpur",
                Destination = "Mumbai",
                TravelDate = new DateTime(2024, 05, 15)
            };
            await proCtr.PutBusRoute(routeId, updatedRoute);
            var retrievedRoute = await context.BusRoutes.FindAsync(routeId);
            Assert.IsNotNull(retrievedRoute);
            Assert.AreEqual("Nagpur", retrievedRoute.Origin);
            Assert.AreEqual("Mumbai", retrievedRoute.Destination);


        }
        [Test]
        public async Task GetRouteById()
        {
            var options = new DbContextOptionsBuilder<FastXContext>().UseSqlServer(config.GetConnectionString("FastXStr")).Options;
            using var context = new FastXContext(options);
            context.Database.EnsureCreated();
            var proCtr = new BusRoutesController(context);
            int RouteId = 4;
            var result = await proCtr.GetBusRoute(RouteId);
            Assert.IsInstanceOf<ActionResult<BusRoute>>(result);
        }
    }
}
