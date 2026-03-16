using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikeCommentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LikeCommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/likecomment/like
        [HttpPost("like")]
        public async Task<IActionResult> LikePost([FromBody] Like like)
        {
            var exists = await _context.Likes
                .AnyAsync(l => l.PostId == like.PostId && l.UserId == like.UserId);
            if (exists) return BadRequest("Already liked.");

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return Ok("Post liked.");
        }

        // DELETE: api/likecomment/unlike
        [HttpDelete("unlike")]
        public async Task<IActionResult> UnlikePost([FromBody] Like like)
        {
            var existing = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == like.PostId && l.UserId == like.UserId);
            if (existing == null) return NotFound("Like not found.");

            _context.Likes.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok("Post unliked.");
        }

        // GET: api/likecomment/likes/5
        [HttpGet("likes/{postId}")]
        public async Task<IActionResult> GetLikes(int postId)
        {
            var count = await _context.Likes.CountAsync(l => l.PostId == postId);
            return Ok(new { postId, likeCount = count });
        }

        // POST: api/likecomment/comment
        [HttpPost("comment")]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            comment.Timestamp = DateTime.UtcNow;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return Ok("Comment added.");
        }

        // GET: api/likecomment/comments/5
        // GET: api/likecomment/comments/5
        [HttpGet("comments/{postId}")]
        public async Task<IActionResult> GetComments(int postId)
        {
            var comments = await _context.Comments
                .Where(c => c.PostId == postId)
                .Join(_context.Users,
                    comment => comment.UserId,
                    user => user.UserId,
                    (comment, user) => new {
                        comment.CommentId,
                        comment.PostId,
                        comment.UserId,
                        Username = user.Username,
                        comment.Content,
                        comment.Timestamp
                    })
                .OrderByDescending(c => c.Timestamp)
                .ToListAsync();
            return Ok(comments);
        }
        // DELETE: api/likecomment/comment/delete/5
        [HttpDelete("comment/delete/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound("Comment not found.");

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return Ok("Comment deleted.");
        }
    }
}