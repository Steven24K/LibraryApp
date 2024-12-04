namespace LibraryApp.Models; 

public partial class Author 
{
    public int Id { get; set; }

    public string Name { get; set; }

    public Book[] Books { get; set; }
}