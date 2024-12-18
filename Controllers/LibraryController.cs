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

        [HttpGet("[action]")]
        [HttpGet("[action]/{property}/{search}")]
        public IActionResult GetAll(string property = "", string search = "")
        {
            Thread.Sleep(1000);
            var random = new Random().Next(0, 10);
            if (random < 3) return BadRequest("Something went wrong");
            var result = _context.Books
            .Include(book => book.Author)
            .Select(book => new { book.Id, book.Title, book.Year, book.Genre, Author = book.Author.Name });

            if (!string.IsNullOrEmpty(property) && !string.IsNullOrEmpty(search))
            {
                if (property == "title")
                    result = result.Where(r => r.Title.Contains(search!));
                if (property == "year")
                    result = result.Where(r => r.Year.ToString().Equals(search!));
                if (property == "genre")
                    result = result.Where(r => r.Genre.Equals(search!));
                if (property == "author")
                    result = result.Where(r => r.Author.Contains(search!));
            }

            return Ok(result.ToArray());
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
