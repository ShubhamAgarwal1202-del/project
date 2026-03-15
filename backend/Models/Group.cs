namespace backend.Models
{
    public class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; } = string.Empty;
        public string GroupMembers { get; set; } = string.Empty;
    }
}