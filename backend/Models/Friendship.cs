namespace backend.Models
{
    public class Friendship
    {
        public int FriendshipId { get; set; }
        public int RequesterId { get; set; }   // user who sent the request
        public int ReceiverId { get; set; }    // user who received the request
        public string Status { get; set; } = "Pending"; // Pending / Accepted
    }
}