using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LibraryApp.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Genre = table.Column<string>(type: "TEXT", nullable: false),
                    Year = table.Column<long>(type: "INTEGER", nullable: false),
                    AuthorId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_Authors_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Authors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "J.K. Rowling" },
                    { 2, "George R.R. Martin" },
                    { 3, "Jane Austen" },
                    { 4, "Mark Twain" },
                    { 5, "Ernest Hemingway" },
                    { 6, "F. Scott Fitzgerald" },
                    { 7, "Toni Morrison" },
                    { 8, "Charles Dickens" },
                    { 9, "Virginia Woolf" },
                    { 10, "Harper Lee" },
                    { 11, "H.G. Wells" },
                    { 12, "Isaac Asimov" },
                    { 13, "Arthur Conan Doyle" },
                    { 14, "Agatha Christie" },
                    { 15, "Leo Tolstoy" },
                    { 16, "Fyodor Dostoevsky" },
                    { 17, "Gabriel García Márquez" },
                    { 18, "Kurt Vonnegut" },
                    { 19, "Ray Bradbury" },
                    { 20, "J.R.R. Tolkien" }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorId", "Genre", "Title", "Year" },
                values: new object[,]
                {
                    { 1L, 1, "Fantasy", "Harry Potter and the Philosopher's Stone", 1997L },
                    { 2L, 1, "Fantasy", "Harry Potter and the Chamber of Secrets", 1998L },
                    { 3L, 2, "Fantasy", "A Game of Thrones", 1996L },
                    { 4L, 2, "Fantasy", "A Clash of Kings", 1998L },
                    { 5L, 3, "Romance", "Pride and Prejudice", 1813L },
                    { 6L, 3, "Romance", "Sense and Sensibility", 1811L },
                    { 7L, 4, "Adventure", "The Adventures of Tom Sawyer", 1876L },
                    { 8L, 4, "Adventure", "The Adventures of Huckleberry Finn", 1884L },
                    { 9L, 5, "Fiction", "The Old Man and the Sea", 1952L },
                    { 10L, 5, "Fiction", "For Whom the Bell Tolls", 1940L },
                    { 11L, 6, "Fiction", "The Great Gatsby", 1925L },
                    { 12L, 6, "Fiction", "This Side of Paradise", 1920L },
                    { 13L, 7, "Historical Fiction", "Beloved", 1987L },
                    { 14L, 7, "Fiction", "Song of Solomon", 1977L },
                    { 15L, 8, "Fiction", "Great Expectations", 1861L },
                    { 16L, 8, "Fiction", "Oliver Twist", 1837L },
                    { 17L, 9, "Fiction", "Mrs. Dalloway", 1925L },
                    { 18L, 9, "Fiction", "To the Lighthouse", 1927L },
                    { 19L, 10, "Fiction", "To Kill a Mockingbird", 1960L },
                    { 20L, 11, "Science Fiction", "The War of the Worlds", 1898L },
                    { 21L, 11, "Science Fiction", "The Time Machine", 1895L },
                    { 22L, 12, "Science Fiction", "Foundation", 1951L },
                    { 23L, 12, "Science Fiction", "I, Robot", 1950L },
                    { 24L, 13, "Mystery", "Sherlock Holmes: A Study in Scarlet", 1887L },
                    { 25L, 13, "Mystery", "The Hound of the Baskervilles", 1902L },
                    { 26L, 14, "Mystery", "Murder on the Orient Express", 1934L },
                    { 27L, 14, "Mystery", "The ABC Murders", 1936L },
                    { 28L, 15, "Historical Fiction", "War and Peace", 1869L },
                    { 29L, 15, "Romance", "Anna Karenina", 1877L },
                    { 30L, 16, "Fiction", "Crime and Punishment", 1866L },
                    { 31L, 16, "Fiction", "The Brothers Karamazov", 1880L },
                    { 32L, 17, "Magical Realism", "One Hundred Years of Solitude", 1967L },
                    { 33L, 17, "Fiction", "Chronicle of a Death Foretold", 1981L },
                    { 34L, 18, "Science Fiction", "Slaughterhouse-Five", 1969L },
                    { 35L, 18, "Science Fiction", "Cat's Cradle", 1963L },
                    { 36L, 19, "Science Fiction", "Fahrenheit 451", 1953L },
                    { 37L, 19, "Science Fiction", "The Martian Chronicles", 1950L },
                    { 38L, 20, "Fantasy", "The Hobbit", 1937L },
                    { 39L, 20, "Fantasy", "The Fellowship of the Ring", 1954L },
                    { 40L, 20, "Fantasy", "The Two Towers", 1954L }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_AuthorId",
                table: "Books",
                column: "AuthorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Authors");
        }
    }
}
