using Microsoft.EntityFrameworkCore;
using LibraryApp.Models;

public class LibraryContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }

    public string DbPath { get; }

    public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
    {

    }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // Author seed data
    modelBuilder.Entity<Author>().HasData(
        new Author { Id = 1, Name = "J.K. Rowling" },
        new Author { Id = 2, Name = "George R.R. Martin" },
        new Author { Id = 3, Name = "Jane Austen" },
        new Author { Id = 4, Name = "Mark Twain" },
        new Author { Id = 5, Name = "Ernest Hemingway" },
        new Author { Id = 6, Name = "F. Scott Fitzgerald" },
        new Author { Id = 7, Name = "Toni Morrison" },
        new Author { Id = 8, Name = "Charles Dickens" },
        new Author { Id = 9, Name = "Virginia Woolf" },
        new Author { Id = 10, Name = "Harper Lee" },
        new Author { Id = 11, Name = "H.G. Wells" },
        new Author { Id = 12, Name = "Isaac Asimov" },
        new Author { Id = 13, Name = "Arthur Conan Doyle" },
        new Author { Id = 14, Name = "Agatha Christie" },
        new Author { Id = 15, Name = "Leo Tolstoy" },
        new Author { Id = 16, Name = "Fyodor Dostoevsky" },
        new Author { Id = 17, Name = "Gabriel García Márquez" },
        new Author { Id = 18, Name = "Kurt Vonnegut" },
        new Author { Id = 19, Name = "Ray Bradbury" },
        new Author { Id = 20, Name = "J.R.R. Tolkien" }
    );

    // Book seed data
    modelBuilder.Entity<Book>().HasData(
        new Book { Id = 1, Title = "Harry Potter and the Philosopher's Stone", Genre = "Fantasy", Year = 1997, AuthorId = 1 },
        new Book { Id = 2, Title = "Harry Potter and the Chamber of Secrets", Genre = "Fantasy", Year = 1998, AuthorId = 1 },
        new Book { Id = 3, Title = "A Game of Thrones", Genre = "Fantasy", Year = 1996, AuthorId = 2 },
        new Book { Id = 4, Title = "A Clash of Kings", Genre = "Fantasy", Year = 1998, AuthorId = 2 },
        new Book { Id = 5, Title = "Pride and Prejudice", Genre = "Romance", Year = 1813, AuthorId = 3 },
        new Book { Id = 6, Title = "Sense and Sensibility", Genre = "Romance", Year = 1811, AuthorId = 3 },
        new Book { Id = 7, Title = "The Adventures of Tom Sawyer", Genre = "Adventure", Year = 1876, AuthorId = 4 },
        new Book { Id = 8, Title = "The Adventures of Huckleberry Finn", Genre = "Adventure", Year = 1884, AuthorId = 4 },
        new Book { Id = 9, Title = "The Old Man and the Sea", Genre = "Fiction", Year = 1952, AuthorId = 5 },
        new Book { Id = 10, Title = "For Whom the Bell Tolls", Genre = "Fiction", Year = 1940, AuthorId = 5 },
        new Book { Id = 11, Title = "The Great Gatsby", Genre = "Fiction", Year = 1925, AuthorId = 6 },
        new Book { Id = 12, Title = "This Side of Paradise", Genre = "Fiction", Year = 1920, AuthorId = 6 },
        new Book { Id = 13, Title = "Beloved", Genre = "Historical Fiction", Year = 1987, AuthorId = 7 },
        new Book { Id = 14, Title = "Song of Solomon", Genre = "Fiction", Year = 1977, AuthorId = 7 },
        new Book { Id = 15, Title = "Great Expectations", Genre = "Fiction", Year = 1861, AuthorId = 8 },
        new Book { Id = 16, Title = "Oliver Twist", Genre = "Fiction", Year = 1837, AuthorId = 8 },
        new Book { Id = 17, Title = "Mrs. Dalloway", Genre = "Fiction", Year = 1925, AuthorId = 9 },
        new Book { Id = 18, Title = "To the Lighthouse", Genre = "Fiction", Year = 1927, AuthorId = 9 },
        new Book { Id = 19, Title = "To Kill a Mockingbird", Genre = "Fiction", Year = 1960, AuthorId = 10 },
        new Book { Id = 20, Title = "The War of the Worlds", Genre = "Science Fiction", Year = 1898, AuthorId = 11 },
        new Book { Id = 21, Title = "The Time Machine", Genre = "Science Fiction", Year = 1895, AuthorId = 11 },
        new Book { Id = 22, Title = "Foundation", Genre = "Science Fiction", Year = 1951, AuthorId = 12 },
        new Book { Id = 23, Title = "I, Robot", Genre = "Science Fiction", Year = 1950, AuthorId = 12 },
        new Book { Id = 24, Title = "Sherlock Holmes: A Study in Scarlet", Genre = "Mystery", Year = 1887, AuthorId = 13 },
        new Book { Id = 25, Title = "The Hound of the Baskervilles", Genre = "Mystery", Year = 1902, AuthorId = 13 },
        new Book { Id = 26, Title = "Murder on the Orient Express", Genre = "Mystery", Year = 1934, AuthorId = 14 },
        new Book { Id = 27, Title = "The ABC Murders", Genre = "Mystery", Year = 1936, AuthorId = 14 },
        new Book { Id = 28, Title = "War and Peace", Genre = "Historical Fiction", Year = 1869, AuthorId = 15 },
        new Book { Id = 29, Title = "Anna Karenina", Genre = "Romance", Year = 1877, AuthorId = 15 },
        new Book { Id = 30, Title = "Crime and Punishment", Genre = "Fiction", Year = 1866, AuthorId = 16 },
        new Book { Id = 31, Title = "The Brothers Karamazov", Genre = "Fiction", Year = 1880, AuthorId = 16 },
        new Book { Id = 32, Title = "One Hundred Years of Solitude", Genre = "Magical Realism", Year = 1967, AuthorId = 17 },
        new Book { Id = 33, Title = "Chronicle of a Death Foretold", Genre = "Fiction", Year = 1981, AuthorId = 17 },
        new Book { Id = 34, Title = "Slaughterhouse-Five", Genre = "Science Fiction", Year = 1969, AuthorId = 18 },
        new Book { Id = 35, Title = "Cat's Cradle", Genre = "Science Fiction", Year = 1963, AuthorId = 18 },
        new Book { Id = 36, Title = "Fahrenheit 451", Genre = "Science Fiction", Year = 1953, AuthorId = 19 },
        new Book { Id = 37, Title = "The Martian Chronicles", Genre = "Science Fiction", Year = 1950, AuthorId = 19 },
        new Book { Id = 38, Title = "The Hobbit", Genre = "Fantasy", Year = 1937, AuthorId = 20 },
        new Book { Id = 39, Title = "The Fellowship of the Ring", Genre = "Fantasy", Year = 1954, AuthorId = 20 },
        new Book { Id = 40, Title = "The Two Towers", Genre = "Fantasy", Year = 1954, AuthorId = 20 }
    );
}

}
