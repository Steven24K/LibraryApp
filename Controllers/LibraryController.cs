using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryApp.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {

        private readonly LibraryContext _context;
        public LibraryController(LibraryContext context)
        {
            _context = context;
        }

        // TODO: Add filters on each property
        [HttpGet("[action]")]
        public IActionResult GetAll()
        {
            var random = new Random().Next(0, 10);
            if (random < 3) return BadRequest("Something went wrong");
            Thread.Sleep(1000);
            var result = _context.Books
            .Include(book => book.Author)
            .Select(book => new { book.Id, book.Title, book.Year, book.Genre, Author = book.Author.Name })
            .ToArray();
            return Ok(result);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetBookById(int id)
        {
            var result = _context.Books
                .Include(book => book.Author)
                .Select(book => new { book.Id, book.Title, book.Year, book.Genre, Author = book.Author.Name })
                .FirstOrDefault(book => book.Id == id);
            if (result == null) return NotFound($"Book not found for {id}");
            return Ok(result);
        }

    }
}
