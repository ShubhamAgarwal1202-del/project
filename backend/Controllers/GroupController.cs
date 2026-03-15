using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/group/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateGroup([FromBody] Group group)
        {
            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return Ok("Group created successfully.");
        }

        // GET: api/group/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllGroups()
        {
            var groups = await _context.Groups.ToListAsync();
            return Ok(groups);
        }

        // DELETE: api/group/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null) return NotFound("Group not found.");

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();
            return Ok("Group deleted.");
        }
    }
}