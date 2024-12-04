
import React = require("react");
import { Book, BookProps, Library } from "../types";

type BookListViewProps = {
    library: Library;
    search: string | number;
    selectedFilter: BookProps;
    onBookSelect: (book: Book) => void;
    onRefresh: () => void;
};

export const BookListView: React.FC<BookListViewProps> = ({ 
    library, 
    search, 
    selectedFilter, 
    onBookSelect,
    onRefresh 
}) => (
    <div className="main">
        <h1>Welcome to the library</h1>
        <div className="filters">
            <label>Filter on:</label>
            <select defaultValue={selectedFilter}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>
            <input type="text" name="search" value={search} placeholder={`Search books on ${selectedFilter}`} />
            <button disabled={search == ""}>Search</button>
            <button onClick={onRefresh}>Refresh</button>
        </div>

        <h2>{library.length} books found</h2>

        <ul className="book-list">
            {library.map(book =>
                <li key={book.id} onClick={() => onBookSelect(book)}>
                    <h2>{book.title}</h2>
                    <p className="author">Author: {book.author}</p>
                    <p className="genre">Genre: {book.genre}</p>
                    <p className="published">Published in: {book.year}</p>
                </li>
            )}
        </ul>
    </div>
);