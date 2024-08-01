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
    public class SeatsController : ControllerBase
    {
        private readonly FastXContext _context;

        public SeatsController(FastXContext context)
        {
            _context = context;
        }
        // GET: api/BusSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSeats(int busId)
        {
            var seats = await _context.Seats
                .Include(seat => seat.Bus)
                .Where(seat => seat.Bus.BusId == busId) // Filter by busId
                .ToListAsync();

            if (seats == null)
            {
                return NotFound();
            }

            var result = seats.Select(seat => new
            {
                SeatId = seat.SeatId,
                SeatNumber = seat.SeatNumber,
                IsAvailable = seat.IsAvailable,

                Bus = new
                {
                    BusId = seat.Bus.BusId,
                    BusNumber = seat.Bus.BusNumber,
                    BusName = seat.Bus.BusName,
                }
            });

            return Ok(result);
        }

        // GET: api/Seats/5
        [HttpGet("{seatId}")]
        //[Authorize(Roles = "Operator,User")]
        public async Task<ActionResult<object>> GetSeat(int seatId)
        {
            var seat = await _context.Seats
                .Where(s => s.SeatId == seatId)
                .Select(s => new
                {
                    SeatId = s.SeatId,
                    SeatNumber = s.SeatNumber,
                    IsAvailable = s.IsAvailable,
                    Bus = new
                    {
                        BusId = s.Bus.BusId,
                        BusNumber = s.Bus.BusNumber,
                        BusName = s.Bus.BusName,
                    }
                })
                .FirstOrDefaultAsync();

            if (seat == null)
            {
                return NotFound();
            }

            return seat;
        }


        // PUT: api/Seats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // PUT: api/Seats/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeat(int id, Seat seat)
        {
            if (id != seat.SeatId)
            {
                return BadRequest();
            }

            _context.Entry(seat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatExists(id))
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

        // POST: api/Seats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Operator")]
        public async Task<ActionResult<Seat>> PostSeat(Seat seat)
        {
          if (_context.Seats == null)
          {
              return Problem("Entity set 'FastXContext.Seats'  is null.");
          }
            _context.Seats.Add(seat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeat", new { id = seat.SeatId }, seat);
        }
        // GET: api/Seats/Details/5
        [HttpGet("Details/{seatId}")]
        public async Task<ActionResult<object>> GetSeatDetails(int seatId)
        {
            var seat = await _context.Seats
                .Where(s => s.SeatId == seatId)
                .Select(s => new
                {
                    SeatId = s.SeatId,
                    SeatNumber = s.SeatNumber,
                    IsAvailable = s.IsAvailable,
                })
                .FirstOrDefaultAsync();

            if (seat == null)
            {
                return NotFound();
            }

            return seat;
        }

        // DELETE: api/Seats/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Operator")]
        public async Task<IActionResult> DeleteSeat(int id)
        {
            if (_context.Seats == null)
            {
                return NotFound();
            }
            var seat = await _context.Seats.FindAsync(id);
            if (seat == null)
            {
                return NotFound();
            }

            _context.Seats.Remove(seat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeatExists(int id)
        {
            return (_context.Seats?.Any(e => e.SeatId == id)).GetValueOrDefault();
        }
    }
}
