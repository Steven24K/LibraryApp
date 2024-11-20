import React = require("react");
import '../static/css/site.css'
import { fromArray } from "./fromArray";
import { List } from "./list";

type Book = {
    id: number
    title: string
    author: string
    genre: string
    year: number
}

type BookProps = Exclude<keyof Book, "id"> //type BookProps =  "title" | "author" | "author" | "year"
// See: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html 

type Library = List<Book>

type Func<a, b> = (_: a) => b

type BookPredicate<FilterKey extends BookProps> = Func<Book[FilterKey], boolean> // i.e. title => title == "Advanced Types in Typescript"

type BookFilter = Func<Book, BookPredicate<BookProps>> // i.e. book => title => book.title == title

type LibraryFilter = Func<Library, Func<BookFilter, Library>> // i.e. books => book => title => book.title == title

interface AppProps {

}

interface AppState {
    library: Library
    search: string | number
    selectedFilter: BookProps
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            library: fromArray([
                { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Technology", year: 1999 },
                { id: 2, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", year: 2008 },
                { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", year: 1960 },
                { id: 4, title: "1984", author: "George Orwell", genre: "Fiction", year: 1949 },
                { id: 5, title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", year: 2011 },
            ]),
            search: "",
            selectedFilter: "title"
        }
    }

    filterAction: LibraryFilter = (library: Library) => (bookFilter: BookFilter) => library.filter(bookFilter)

    render(): React.ReactNode {
        return <div className="main">
            <h1>Welcome to the library</h1>
            <div className="filters">
                <label>Filter on:</label>
                <select defaultValue={this.state.selectedFilter}>
                    <option value="title">Title</option>
                    <option value="author">Auhtor</option>
                    <option value="genre">Genre</option>
                    <option value="year">Year</option>
                </select>
                <input type="text" name="search" value={this.state.search} placeholder={`Search books on ${this.state.selectedFilter}`} />
                <button disabled={this.state.search == ""}>Search</button>
            </div>

            <h2>{this.state.library.length} books found</h2>

            <ul className="book-list">
                {
                    this.state.library.map(book =>
                        <li key={book.id}>
                            <h2>{book.title} </h2>
                            <p className="author">Author: {book.author}</p>
                            <p className="genre">Genre: {book.genre}</p>
                            <p className="published">Published in: {book.year}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    }
}