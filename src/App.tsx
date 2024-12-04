import React = require("react");
import '../static/css/site.css'
import { ApiData, FullFilled, Idle, Pending, Rejected } from "./dataLoaders";

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

// TODO: Make one fetch function

const getAllBooks = async (): Promise<ApiData<Library>> => {
    const response = await fetch(`/api/Library/GetAll`)
    if (!response.ok) return Rejected(await response.text())
    return FullFilled(await response.json())
}

const getBookById = (book: Book) => async (): Promise<ApiData<Book>> => {
    const response = await fetch(`/api/Library/GetBookById/${book.id}`)
    if (!response.ok) return Rejected(await response.text())
    return FullFilled(await response.json())
}


interface AppState {
    library: ApiData<Library>
    book: ApiData<Book>
    search: string | number
    selectedFilter: BookProps
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            library: Idle(),
            book: Idle(),
            search: "",
            selectedFilter: "title"
        }
    }

    componentDidMount(): void {
        this.setState(s => ({ ...s, library: Pending(getAllBooks) }))
    }

    componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>): void {
        if (prevState.library.kind != 'pending' && this.state.library.kind == 'pending') {
            this.state.library.loader().then(data => this.setState(s => ({ ...s, library: data })))
        }

        if (this.state.book.kind == 'pending') {
            this.state.book.loader().then(data => this.setState(s => ({ ...s, book: data })))
        }
    }

    filterAction: LibraryFilter = (library: Library) => (bookFilter: BookFilter) => library.filter(bookFilter)

    render(): React.ReactNode {
        // TODO: Make a stateless function component from the markup below.
        if (this.state.library.kind == 'idle') return <div className="nothing">Nothing to show yet</div>
        if (this.state.library.kind == 'pending') return <div className="loading"></div>
        if (this.state.library.kind == 'rejected')
            return <div className="error">
                <p>
                    {this.state.library.errorMessage || "Something went wrong..."}
                </p>
                <p>
                    <button onClick={(() => this.setState(s => ({ ...s, library: Pending(getAllBooks) })))}>Retry</button>
                </p>
            </div>

        if (this.state.book.kind == 'fullfilled') {
            const book = this.state.book.data
            return <div>
                <button onClick={() => this.setState(s => ({...s, book: Idle()}))}>Go back to overview</button>
                <h1>{book.title}</h1>
                <p>Genre: {book.genre}</p>
                <p>Autor: {book.author}</p>
                <p>Year published: {book.year}</p>
            </div> 
        } 
        if (this.state.book.kind == 'rejected') {
            return <div>{this.state.book.errorMessage}</div>
        }

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
                <button onClick={(() => this.setState(s => ({ ...s, library: Pending(getAllBooks) })))}>Refresh</button>
            </div>

            <h2>{this.state.library.data.length} books found</h2>

            <ul className="book-list">
                {
                    this.state.library.data.map(book =>
                        <li key={book.id}
                            onClick={() => this.setState(s => ({ ...s, book: Pending((getBookById(book))) }))}
                        >
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