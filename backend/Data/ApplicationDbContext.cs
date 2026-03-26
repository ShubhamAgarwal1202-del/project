using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unique username
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // Unique like per user per post
            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.PostId, l.UserId })
                .IsUnique();

            // Fast query on post status
            modelBuilder.Entity<Post>()
                .HasIndex(p => p.Status);

            // Fast conversation lookup
            modelBuilder.Entity<Message>()
                .HasIndex(m => new { m.SenderId, m.ReceiverId });

            // Fast comment lookup by post
            modelBuilder.Entity<Comment>()
                .HasIndex(c => c.PostId);

            // Prevent duplicate friend requests
            modelBuilder.Entity<Friendship>()
                .HasIndex(f => new { f.RequesterId, f.ReceiverId })
                .IsUnique();
        }
    }
}