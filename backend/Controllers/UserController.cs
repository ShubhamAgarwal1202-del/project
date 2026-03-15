using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/user/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new { u.UserId, u.Username, u.Role, u.ProfileImage })
                .ToListAsync();
            return Ok(users);
        }

        // GET: api/user/search?username=shubham
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string username)
        {
            var users = await _context.Users
                .Where(u => u.Username.Contains(username))
                .Select(u => new { u.UserId, u.Username, u.Role, u.ProfileImage })
                .ToListAsync();
            return Ok(users);
        }

        // DELETE: api/user/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User deleted.");
        }
        
        // PUT: api/user/update/5
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] backend.Models.User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            user.Username = updatedUser.Username;
            user.Role = updatedUser.Role;
            user.ProfileImage = updatedUser.ProfileImage;

            await _context.SaveChangesAsync();
            return Ok("User updated successfully.");
        }

        // POST: api/user/create (admin creates user)
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] backend.Models.User newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Username == newUser.Username))
                return BadRequest("Username already exists.");

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok("User created successfully.");
        }
    }
}