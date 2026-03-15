using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/post/create
        [HttpPost("create")]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            post.Status = "Pending";
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return Ok("Post submitted for approval.");
        }

        // GET: api/post/approved
        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedPosts()
        {
            var posts = await _context.Posts
                .Where(p => p.Status == "Approved")
                .Include(p => p.User)
                .ToListAsync();
            return Ok(posts);
        }

        // GET: api/post/pending
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingPosts()
        {
            var posts = await _context.Posts
                .Where(p => p.Status == "Pending")
                .Include(p => p.User)
                .ToListAsync();
            return Ok(posts);
        }

        // PUT: api/post/approve/5
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApprovePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Post not found.");

            post.Status = "Approved";
            await _context.SaveChangesAsync();
            return Ok("Post approved.");
        }

        // PUT: api/post/reject/5
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Post not found.");

            post.Status = "Rejected";
            await _context.SaveChangesAsync();
            return Ok("Post rejected.");
        }

        // DELETE: api/post/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return NotFound("Post not found.");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok("Post deleted.");
        }
    }
}