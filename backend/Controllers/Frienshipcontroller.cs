using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FriendshipController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FriendshipController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/friendship/send
        [HttpPost("send")]
        public async Task<IActionResult> SendRequest([FromBody] Friendship request)
        {
            // Check if request already exists either way
            var exists = await _context.Friendships.AnyAsync(f =>
                (f.RequesterId == request.RequesterId && f.ReceiverId == request.ReceiverId) ||
                (f.RequesterId == request.ReceiverId && f.ReceiverId == request.RequesterId));

            if (exists) return BadRequest("Friend request already sent or already friends.");

            request.Status = "Pending";
            _context.Friendships.Add(request);
            await _context.SaveChangesAsync();
            return Ok("Friend request sent.");
        }

        // PUT: api/friendship/accept/5
        [HttpPut("accept/{id}")]
        public async Task<IActionResult> AcceptRequest(int id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            if (friendship == null) return NotFound("Request not found.");

            friendship.Status = "Accepted";
            await _context.SaveChangesAsync();
            return Ok("Friend request accepted.");
        }

        // DELETE: api/friendship/reject/5
        [HttpDelete("reject/{id}")]
        public async Task<IActionResult> RejectOrUnfriend(int id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            if (friendship == null) return NotFound("Not found.");

            _context.Friendships.Remove(friendship);
            await _context.SaveChangesAsync();
            return Ok("Removed.");
        }

        // GET: api/friendship/friends/1
        [HttpGet("friends/{userId}")]
        public async Task<IActionResult> GetFriends(int userId)
        {
            var friendships = await _context.Friendships
                .Where(f =>
                    (f.RequesterId == userId || f.ReceiverId == userId)
                    && f.Status == "Accepted")
                .ToListAsync();

            // Get the friend's userId (the one that is NOT the current user)
            var friendIds = friendships.Select(f =>
                f.RequesterId == userId ? f.ReceiverId : f.RequesterId
            ).ToList();

            var friends = await _context.Users
                .Where(u => friendIds.Contains(u.UserId))
                .Select(u => new { u.UserId, u.Username, u.ProfileImage })
                .ToListAsync();

            return Ok(friends);
        }

        // GET: api/friendship/requests/1  (pending requests RECEIVED by this user)
        [HttpGet("requests/{userId}")]
        public async Task<IActionResult> GetPendingRequests(int userId)
        {
            var requests = await _context.Friendships
                .Where(f => f.ReceiverId == userId && f.Status == "Pending")
                .ToListAsync();

            // Attach requester username
            var result = new List<object>();
            foreach (var req in requests)
            {
                var requester = await _context.Users
                    .Where(u => u.UserId == req.RequesterId)
                    .Select(u => new { u.UserId, u.Username })
                    .FirstOrDefaultAsync();

                result.Add(new
                {
                    req.FriendshipId,
                    req.RequesterId,
                    RequesterUsername = requester?.Username,
                    req.ReceiverId,
                    req.Status
                });
            }

            return Ok(result);
        }

        // GET: api/friendship/status?userId=1&otherUserId=2
        [HttpGet("status")]
        public async Task<IActionResult> GetStatus([FromQuery] int userId, [FromQuery] int otherUserId)
        {
            var friendship = await _context.Friendships.FirstOrDefaultAsync(f =>
                (f.RequesterId == userId && f.ReceiverId == otherUserId) ||
                (f.RequesterId == otherUserId && f.ReceiverId == userId));

            if (friendship == null) return Ok(new { status = "None", friendshipId = 0 });

            return Ok(new
            {
                status = friendship.Status,
                friendshipId = friendship.FriendshipId,
                iRequested = friendship.RequesterId == userId
            });
        }
    }
}

