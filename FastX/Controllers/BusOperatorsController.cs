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
    public class BusOperatorsController : ControllerBase
    {
        private readonly FastXContext _context;

        public BusOperatorsController(FastXContext context)
        {
            _context = context;
        }

        // GET: api/BusOperators
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<BusOperator>>> GetBusOperators()
        {
          if (_context.BusOperators == null)
          {
              return NotFound();
          }
            return await _context.BusOperators.ToListAsync();
        }

        // GET: api/BusOperators/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<BusOperator>> GetBusOperator(int id)
        {
          if (_context.BusOperators == null)
          {
              return NotFound();
          }
            var busOperator = await _context.BusOperators.FindAsync(id);

            if (busOperator == null)
            {
                return NotFound();
            }

            return busOperator;
        }

        // PUT: api/BusOperators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Operator")]
        public async Task<IActionResult> PutBusOperator(int id, BusOperator busOperator)
        {
            if (id != busOperator.BusOperatorId)
            {
                return BadRequest();
            }

            _context.Entry(busOperator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusOperatorExists(id))
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

        // POST: api/BusOperators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles ="Operator")]
        public async Task<ActionResult<BusOperator>> PostBusOperator(BusOperator busOperator)
        {
          if (_context.BusOperators == null)
          {
              return Problem("Entity set 'FastXContext.BusOperators'  is null.");
          }
            _context.BusOperators.Add(busOperator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusOperator", new { id = busOperator.BusOperatorId }, busOperator);
        }

        // DELETE: api/BusOperators/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBusOperator(int id)
        {
            if (_context.BusOperators == null)
            {
                return NotFound();
            }
            var busOperator = await _context.BusOperators.FindAsync(id);
            if (busOperator == null)
            {
                return NotFound();
            }

            _context.BusOperators.Remove(busOperator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusOperatorExists(int id)
        {
            return (_context.BusOperators?.Any(e => e.BusOperatorId == id)).GetValueOrDefault();
        }
    }
}
