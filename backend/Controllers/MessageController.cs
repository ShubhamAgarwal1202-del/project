using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/message/send
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] Message message)
        {
            message.Timestamp = DateTime.UtcNow;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return Ok("Message sent successfully.");
        }

        // GET: api/message/conversation?senderId=1&receiverId=2
        [HttpGet("conversation")]
        public async Task<IActionResult> GetConversation([FromQuery] int senderId, [FromQuery] int receiverId)
        {
            var messages = await _context.Messages
                .Where(m =>
                    (m.SenderId == senderId && m.ReceiverId == receiverId) ||
                    (m.SenderId == receiverId && m.ReceiverId == senderId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return Ok(messages);
        }

        // GET: api/message/inbox/1
        [HttpGet("inbox/{userId}")]
        public async Task<IActionResult> GetInbox(int userId)
        {
            var messages = await _context.Messages
                .Where(m => m.ReceiverId == userId)
                .OrderByDescending(m => m.Timestamp)
                .ToListAsync();

            return Ok(messages);
        }
    }
}