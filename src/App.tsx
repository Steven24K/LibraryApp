import React = require("react");
import '../static/css/site.css'
import { fromArray } from "./fromArray";
import { EmptyNode, List } from "./list";
import { ApiData, Idle } from "./dataLoaders";

type Book = {
    id: number
    title: string
    author: string
    genre: string
    year: number
}

type BookProps = Exclude<keyof Book, "id"> //type BookProps =  "title" | "author" | "author" | "year"
// See: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html 

type Library = Book[]

type Func<a, b> = (_: a) => b

type BookPredicate<FilterKey extends BookProps> = Func<Book[FilterKey], boolean> // i.e. title => title == "Advanced Types in Typescript"

type BookFilter = Func<Book, BookPredicate<BookProps>> // i.e. book => title => book.title == title

type LibraryFilter = Func<Library, Func<BookFilter, Library>> // i.e. books => book => title => book.title == title

interface AppProps {

}



interface AppState {
    library: ApiData<Library>
    search: string | number
    selectedFilter: BookProps
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            library: Idle(),
            search: "",
            selectedFilter: "title"
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/library/getall')
            .then(response => response.json())
            .then(data => this.setState({ library: { kind: 'fullfilled', data: data } }))
            .catch(error => this.setState({ library: { kind: 'rejected', errorMessage: error.message } }))
    }

    // filterAction: LibraryFilter = (library: Library) => (bookFilter: BookFilter) => fromArray(library.filter(bookFilter))

    render(): React.ReactNode {
        
        if (this.state.library.kind == 'pending') return <div>Loading...</div>
        if (this.state.library.kind == 'rejected') return <div>{this.state.library.errorMessage || "Something went wrong..."}</div>
        if (this.state.library.kind == 'idle') return <div>Nothing to show yet</div>


        return <div className="main">
            <h1>Welcome to the library</h1>
            <div className="filters">
                <label>Filter on:</label>
                <select defaultValue={this.state.selectedFilter}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    <option value="year">Year</option>
                </select>
                <input type="text" name="search" value={this.state.search} placeholder={`Search books on ${this.state.selectedFilter}`} />
                <button disabled={this.state.search == ""}>Search</button>
            </div>

            <h2>{this.state.library.data.length} books found</h2>

            <ul className="book-list">
                {
                    this.state.library.data.map(book =>
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