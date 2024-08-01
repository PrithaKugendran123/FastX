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
    public class BusRoutesController : ControllerBase
    {
        private readonly FastXContext _context;

        public BusRoutesController(FastXContext context)
        {
            _context = context;
        }

        // GET: api/BusRoutes
        [HttpGet]

        //[Authorize(Roles = "Admin,Operator,User")]
        public async Task<ActionResult<IEnumerable<BusRoute>>> GetBusRoutes()
        {
          if (_context.BusRoutes == null)
          {
              return NotFound();
          }
            return await _context.BusRoutes.ToListAsync();
        }

        // GET: api/BusRoutes/5
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

        // PUT: api/BusRoutes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin,Operator")]
        public async Task<IActionResult> PutBusRoute(int id, BusRoute busRoute)
        {
            if (id != busRoute.RouteId)
            {
                return BadRequest();
            }

            _context.Entry(busRoute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusRouteExists(id))
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

        // POST: api/BusRoutes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<BusRoute>> PostBusRoute(BusRoute busRoute)
        {
          if (_context.BusRoutes == null)
          {
              return Problem("Entity set 'FastXContext.BusRoutes'  is null.");
          }
            _context.BusRoutes.Add(busRoute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusRoute", new { id = busRoute.RouteId }, busRoute);
        }

        // DELETE: api/BusRoutes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Operator")]
        public async Task<IActionResult> DeleteBusRoute(int id)
        {
            if (_context.BusRoutes == null)
            {
                return NotFound();
            }
            var busRoute = await _context.BusRoutes.FindAsync(id);
            if (busRoute == null)
            {
                return NotFound();
            }

            _context.BusRoutes.Remove(busRoute);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusRouteExists(int id)
        {
            return (_context.BusRoutes?.Any(e => e.RouteId == id)).GetValueOrDefault();
        }
    }
}
