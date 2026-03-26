using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ========================= REGISTER =========================
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Check if username exists
                if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
                    return BadRequest("Username already exists.");

                var user = new User
                {
                    Username = dto.Username,
                    Password = BCrypt.Net.BCrypt.HashPassword(dto.Password), // 🔐 HASHED
                    Role = "User"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ========================= LOGIN =========================
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == dto.Username);

                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                    return Unauthorized("Invalid username or password.");

                var token = GenerateJwtToken(user);

                return Ok(new
                {
                    token,
                    userId = user.UserId,
                    username = user.Username,
                    role = user.Role
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ========================= JWT GENERATION =========================
        private string GenerateJwtToken(User user)
        {
            // 🔑 Claims (VERY IMPORTANT)
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), // REQUIRED
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var keyString = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(keyString))
                throw new Exception("JWT Key is missing in configuration.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1), // ⏱ 1 hour expiry
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}