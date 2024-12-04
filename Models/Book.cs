namespace LibraryApp.Models; 

    public partial class Book
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Genre { get; set; }

        public long Year { get; set; }

        public int AuthorId { get; set; }

        public Author Author{ get; set; }
    }