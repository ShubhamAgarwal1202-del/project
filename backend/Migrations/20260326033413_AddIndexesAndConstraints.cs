using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexesAndConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Posts",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Friendships",
                columns: table => new
                {
                    FriendshipId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RequesterId = table.Column<int>(type: "int", nullable: false),
                    ReceiverId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friendships", x => x.FriendshipId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_Status",
                table: "Posts",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId_ReceiverId",
                table: "Messages",
                columns: new[] { "SenderId", "ReceiverId" });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_PostId_UserId",
                table: "Likes",
                columns: new[] { "PostId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_RequesterId_ReceiverId",
                table: "Friendships",
                columns: new[] { "RequesterId", "ReceiverId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friendships");

            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Posts_Status",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Messages_SenderId_ReceiverId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Likes_PostId_UserId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Comments_PostId",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
