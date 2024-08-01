using System.Linq;
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
            var busSchedules = await _context.BusSchedules
                .Include(schedule => schedule.Bus)
                .ToListAsync();

            if (busSchedules == null)
            {
                return NotFound();
            }

            return Ok(busSchedules);
        }

        // GET: api/BusSchedules/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Operator,User")]
        public async Task<ActionResult<BusSchedule>> GetBusSchedule(int id)
        {
            var busSchedule = await _context.BusSchedules.FindAsync(id);

            if (busSchedule == null)
            {
                return NotFound();
            }

            return Ok(busSchedule);
        }

        // PUT: api/BusSchedules/5
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
        [HttpPost]
        [Authorize(Roles = "Operator")]
        public async Task<ActionResult<BusSchedule>> PostBusSchedule(BusSchedule busSchedule)
        {
            _context.BusSchedules.Add(busSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBusSchedule), new { id = busSchedule.ScheduleId }, busSchedule);
        }

        // DELETE: api/BusSchedules/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Operator")]
        public async Task<IActionResult> DeleteBusSchedule(int id)
        {
            var busSchedule = await _context.BusSchedules.FindAsync(id);
            if (busSchedule == null)
            {
                return NotFound();
            }

            _context.BusSchedules.Remove(busSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByBusId/{busId}")]
        //[Authorize(Roles = "Operator,User")]
        public async Task<ActionResult<IEnumerable<BusSchedule>>> GetBusSchedulesByBusId(int busId)
        {
            var busSchedules = await _context.BusSchedules
                .Include(schedule => schedule.Bus)
                .Where(schedule => schedule.Bus.BusId == busId)
                .ToListAsync();

            if (busSchedules == null || busSchedules.Count == 0)
            {
                return NotFound($"No schedules found for BusId: {busId}");
            }

            return Ok(busSchedules);
        }

        private bool BusScheduleExists(int id)
        {
            return (_context.BusSchedules?.Any(e => e.ScheduleId == id)).GetValueOrDefault();
        }
    }
}
