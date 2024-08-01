using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FastX.Models;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace FastX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginTablesController : ControllerBase
    {
        private readonly FastXContext _context;
        private readonly IConfiguration _configuration;
        public LoginTablesController(FastXContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/LoginTables
        [HttpGet]
      
        public async Task<ActionResult<IEnumerable<LoginTable>>> GetLoginTables()
        {
          if (_context.LoginTables == null)
          {
              return NotFound();
          }
            return await _context.LoginTables.ToListAsync();
        }

        // GET: api/LoginTables/5
        [HttpGet("{id}")]
      
        public async Task<ActionResult<LoginTable>> GetLoginTable(int id)
        {
          if (_context.LoginTables == null)
          {
              return NotFound();
          }
            var loginTable = await _context.LoginTables.FindAsync(id);

            if (loginTable == null)
            {
                return NotFound();
            }

            return loginTable;
        }

        // PUT: api/LoginTables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
       
        public async Task<IActionResult> PutLoginTable(int id, LoginTable loginTable)
        {
            if (id != loginTable.LoginId)
            {
                return BadRequest();
            }

            _context.Entry(loginTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginTableExists(id))
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

        // POST: api/LoginTables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<LoginTable>> PostLoginTable(LoginTable loginTable)
        //{
        //  if (_context.LoginTables == null)
        //  {
        //      return Problem("Entity set 'FastXContext.LoginTables'  is null.");
        //  }
        //    _context.LoginTables.Add(loginTable);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetLoginTable", new { id = loginTable.LoginId }, loginTable);
        //}
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody] LoginTable user)
        {
            var _user = _context.LoginTables.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password && u.Role == user.Role);

            if (_user == null)
                return Unauthorized();

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            //var subject = new ClaimsIdentity(new[] { new Claim(JwtRegisteredClaimNames.Sub, _user.Email), new Claim(JwtRegisteredClaimNames.Email, _user.Email) });
            var subject = new ClaimsIdentity(new[]
            {
                // new Claim(JwtRegisteredClaimNames.Sub, _user.UserLoginId.ToString()),
                 new Claim(JwtRegisteredClaimNames.Sub, _user.Email),
                 new Claim(JwtRegisteredClaimNames.Email, _user.Email),
                 new Claim(ClaimTypes.Role, _user.Role)
            });

            var expires = DateTime.UtcNow.AddMinutes(10);
            var tokenDecription = new SecurityTokenDescriptor { Subject = subject, SigningCredentials = signingCredentials, Expires = expires, Issuer = issuer, Audience = audience };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDecription);
            var jwtToken = tokenHandler.WriteToken(token);

            // Return the JWT token in the response
            return Ok(new { jwtToken, user = _user });


        }

        // DELETE: api/LoginTables/5
        [HttpDelete("{id}")]
     
        public async Task<IActionResult> DeleteLoginTable(int id)
        {
            if (_context.LoginTables == null)
            {
                return NotFound();
            }
            var loginTable = await _context.LoginTables.FindAsync(id);
            if (loginTable == null)
            {
                return NotFound();
            }

            _context.LoginTables.Remove(loginTable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginTableExists(int id)
        {
            return (_context.LoginTables?.Any(e => e.LoginId == id)).GetValueOrDefault();
        }
    }
}
