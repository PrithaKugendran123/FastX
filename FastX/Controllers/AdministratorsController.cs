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
    public class AdministratorsController : ControllerBase
    {
        private readonly FastXContext _context;
     

        public AdministratorsController(FastXContext context)
        {
            _context = context;
        }


        // GET: api/Administrators
        [HttpGet]
        //[Authorize(Roles ="Admin")]
        public async Task<ActionResult<IEnumerable<Administrator>>> GetAdministrators()
        {
          if (_context.Administrators == null)
          {
              return NotFound();
          }
            return await _context.Administrators.ToListAsync();
        }

        // GET: api/Administrators/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Administrator>> GetAdministrator(int id)
        {
          if (_context.Administrators == null)
          {
              return NotFound();
          }
            var administrator = await _context.Administrators.FindAsync(id);

            if (administrator == null)
            {
                return NotFound();
            }

            return administrator;
        }

        // PUT: api/Administrators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutAdministrator(int id, Administrator administrator)
        {
            if (id != administrator.AdminId)
            {
                return BadRequest();
            }

            _context.Entry(administrator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministratorExists(id))
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

        // POST: api/Administrators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost("authenticate")]
        //[Authorize(Roles = "User")]
        public async Task<IActionResult> Authenticate([FromBody] Administrator adminObj)
        {
            if (adminObj == null)
            {
                return BadRequest();
            }
            var admin = await _context.Administrators.FirstOrDefaultAsync(x => x.Email == adminObj.Email && x.Password == adminObj.Password);
            if (admin == null)
            {
                return NotFound(new { Message = "Admin Not Found" });
            }
            return Ok();

        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<Administrator>> PostAdministrator(Administrator administrator)
        {
          if (_context.Administrators == null)
          {
              return Problem("Entity set 'FastXContext.Administrators'  is null.");
          }
            _context.Administrators.Add(administrator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdministrator", new { id = administrator.AdminId }, administrator);
        }

        // DELETE: api/Administrators/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAdministrator(int id)
        {
            if (_context.Administrators == null)
            {
                return NotFound();
            }
            var administrator = await _context.Administrators.FindAsync(id);
            if (administrator == null)
            {
                return NotFound();
            }

            _context.Administrators.Remove(administrator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdministratorExists(int id)
        {
            return (_context.Administrators?.Any(e => e.AdminId == id)).GetValueOrDefault();
        }
    }
}
