using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FastX.Models;
using Microsoft.AspNetCore.Authorization;

namespace FastX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class busesController : ControllerBase
    {
        private readonly FastXContext _context;

        public busesController(FastXContext context)
        {
            _context = context;
        }

        // GET: api/buses
        [HttpGet]
        [Authorize(Roles = "User,Operator,Admin")]
        public async Task<ActionResult<IEnumerable<bus>>> GetBuses()
        {
          if (_context.Buses == null)
          {
              return NotFound();
          }
            return await _context.Buses.ToListAsync();
        }

        // GET: api/BusRoutes/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin,Operator,User")]
        public async Task<ActionResult<BusRoute>> GetBusRoute(int id)
        {
            if (_context.BusRoutes == null)
            {
                return NotFound();
            }

            var busRoute = await (
                from br in _context.BusRoutes
                where br.RouteId == id
                select new
                {
                    BusRoute = br,
                    Buses = _context.Buses.Where(b => b.RouteId == br.RouteId).ToList()
                }
            ).FirstOrDefaultAsync();

            if (busRoute == null)
            {
                return NotFound();
            }

            busRoute.BusRoute.buses = busRoute.Buses;

            return busRoute.BusRoute;
        }
        // GET: api/buses/details/{id}
        [HttpGet("bus/{id}")]
        [Authorize(Roles = "Admin,Operator,User")]
        public async Task<ActionResult> GetBusDetails(int id)
        {
            var bus = await _context.Buses.FindAsync(id);

            if (bus == null)
            {
                return NotFound();
            }

            // Return an anonymous object with bus details
            return Ok(new
            {
                bus.BusId,
                bus.BusNumber,
                bus.BusName,
                bus.SeatType,
                bus.BusType,
                bus.PickUp,
                bus.DropPoint
                // Add any other properties you want to include
            });
        }

        // GET: api/buses/{id}
        [HttpGet("details/{id}")]
        //[Authorize(Roles = "Admin,Operator,User")]
        public async Task<ActionResult<bus>> GetBusDetailsWithSchedules(int id)
        {
            if (_context.Buses == null)
            {
                return NotFound();
            }

            var busDetails = await (
        from b in _context.Buses
        where b.BusId == id
        select new
        {
            Bus = b,
            Schedules = _context.BusSchedules
                .Where(bs => bs.BusId == b.BusId)
                .ToList()
        }
    ).FirstOrDefaultAsync();

            if (busDetails == null)
            {
                return NotFound();
            }

            busDetails.Bus.BusSchedules = busDetails.Schedules; // Assuming bus has a property for schedules

            return busDetails.Bus;

        }

        // PUT: api/buses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Operator, Admin")]
        public async Task<IActionResult> Putbus(int id, bus bus)
        {
            if (id != bus.BusId)
            {
                return BadRequest();
            }

            _context.Entry(bus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!busExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/buses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Operator, Admin")]
        public async Task<ActionResult<bus>> Postbus(bus bus)
        {
          if (_context.Buses == null)
          {
              return Problem("Entity set 'FastXContext.Buses'  is null.");
          }
            _context.Buses.Add(bus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getbus", new { id = bus.BusId }, bus);
        }

        // DELETE: api/buses/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Operator")]
        public async Task<IActionResult> Deletebus(int id)
        {
            if (_context.Buses == null)
            {
                return NotFound();
            }
            var bus = await _context.Buses.FindAsync(id);
            if (bus == null)
            {
                return NotFound();
            }

            _context.Buses.Remove(bus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool busExists(int id)
        {
            return (_context.Buses?.Any(e => e.BusId == id)).GetValueOrDefault();
        }
    }
}
