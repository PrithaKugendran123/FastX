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
    public class BusSchedulesController : ControllerBase
    {
        private readonly FastXContext _context;

        public BusSchedulesController(FastXContext context)
        {
            _context = context;
        }

        // GET: api/BusSchedules
        [HttpGet]
        [Authorize(Roles = "Operator,User")]
        public async Task<ActionResult<IEnumerable<BusSchedule>>> GetBusSchedules()
        {
          if (_context.BusSchedules == null)
          {
              return NotFound();
          }
            return await _context.BusSchedules.ToListAsync();
        }

        // GET: api/BusSchedules/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Operator,User")]
        public async Task<ActionResult<BusSchedule>> GetBusSchedule(int id)
        {
          if (_context.BusSchedules == null)
          {
              return NotFound();
          }
            var busSchedule = await _context.BusSchedules.FindAsync(id);

            if (busSchedule == null)
            {
                return NotFound();
            }

            return busSchedule;
        }

        // PUT: api/BusSchedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Operator")]
        public async Task<IActionResult> PutBusSchedule(int id, BusSchedule busSchedule)
        {
            if (id != busSchedule.ScheduleId)
            {
                return BadRequest();
            }

            _context.Entry(busSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusScheduleExists(id))
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

        // POST: api/BusSchedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Operator")]
        public async Task<ActionResult<BusSchedule>> PostBusSchedule(BusSchedule busSchedule)
        {
          if (_context.BusSchedules == null)
          {
              return Problem("Entity set 'FastXContext.BusSchedules'  is null.");
          }
            _context.BusSchedules.Add(busSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusSchedule", new { id = busSchedule.ScheduleId }, busSchedule);
        }

        // DELETE: api/BusSchedules/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Operator")]
        public async Task<IActionResult> DeleteBusSchedule(int id)
        {
            if (_context.BusSchedules == null)
            {
                return NotFound();
            }
            var busSchedule = await _context.BusSchedules.FindAsync(id);
            if (busSchedule == null)
            {
                return NotFound();
            }

            _context.BusSchedules.Remove(busSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusScheduleExists(int id)
        {
            return (_context.BusSchedules?.Any(e => e.ScheduleId == id)).GetValueOrDefault();
        }
    }
}
