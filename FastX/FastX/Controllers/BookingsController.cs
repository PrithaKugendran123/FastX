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
    public class BookingsController : ControllerBase
    {
        private readonly FastXContext _context;

        public BookingsController(FastXContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        [Authorize(Roles = "User, Operator,Admin")]
        public async Task<ActionResult<IEnumerable<object>>> GetBookings()
        {
            // Use Include to eagerly load the related Bus entity
            var bookings = await _context.Bookings
                .Include(booking => booking.Bus)
                .Include(booking=>booking.User)
                .ToListAsync();

            if (bookings == null)
            {
                return NotFound();
            }

            // Project the results using LINQ Select
            var result = bookings.Select(booking => new
            {
                BookingId = booking.BookingId,
                TotalSeats = booking.TotalSeats,
                TotalCost = booking.TotalCost,
                SeatNumbers = booking.SeatNumbers,
                BookingDate = booking.BookingDate,

                Bus = new
                {
                    BusId = booking.Bus?.BusId,
                    BusNumber = booking.Bus?.BusNumber,
                    BusName = booking.Bus?.BusName,
                    // Include other properties you need from the Bus entity
                },
                User = new
                {
                      UserId=booking.User?.UserId,
                      Name=booking.User?.Name,
                      Email=booking.User?.Email
                }
            });

            return Ok(result);
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
      
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
          if (_context.Bookings == null)
          {
              return NotFound();
          }
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "User, Operator")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
          if (_context.Bookings == null)
          {
              return Problem("Entity set 'FastXContext.Bookings'  is null.");
          }
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }
        // GET: api/Bookings/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetBookingsByUserId(int userId)
        {
            // Filter bookings based on userId
            var bookings = await _context.Bookings
                .Include(booking => booking.Bus)
                .Include(booking => booking.User)
                .Where(booking => booking.UserId == userId)
                .ToListAsync();

            if (bookings == null)
            {
                return NotFound();
            }

            // Project the results using LINQ Select
            var result = bookings.Select(booking => new
            {
                BookingId = booking.BookingId,
                TotalSeats = booking.TotalSeats,
                TotalCost = booking.TotalCost,
                SeatNumbers = booking.SeatNumbers,
                BookingDate = booking.BookingDate,

                Bus = new
                {
                    BusId = booking.Bus?.BusId,
                    BusNumber = booking.Bus?.BusNumber,
                    BusName = booking.Bus?.BusName,
                    PickUp=booking.Bus?.PickUp,
                    DropPoint=booking.Bus?.DropPoint
                    // Include other properties you need from the Bus entity
                },
                User = new
                {
                    UserId = booking.User?.UserId,
                    Name = booking.User?.Name,
                    Email = booking.User?.Email
                }
            });

            return Ok(result);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Operator, Admin")]

        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.BookingId == id)).GetValueOrDefault();
        }
    }
}
