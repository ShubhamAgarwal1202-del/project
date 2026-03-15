namespace backend.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? PostImage { get; set; }
        public string Status { get; set; } = "Pending";
        public User? User { get; set; }
    }
}