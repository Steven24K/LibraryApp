import React = require("react");
import '../static/css/site.css'
import { ApiData, FullFilled, Idle, Pending, Rejected } from "./dataLoaders";
import { DataLoader } from "./DataLoader";
import { BookDetail } from "./BookDetail";

export type Book = {
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

async function getFetch<T>(url: string): Promise<ApiData<T>> {
    const response = await fetch(url)
    if (!response.ok) return Rejected(await response.text())
    return FullFilled(await response.json())
}

const getAllBooks = async (): Promise<ApiData<Library>> => getFetch(`/api/Library/GetAll`)
const getBookById = (book: Book) => async (): Promise<ApiData<Book>> => getFetch(`/api/Library/GetBookById/${book.id}`)


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
            this.state.library
        }

        if (prevState.book.kind != 'pending' && this.state.book.kind == 'pending') {
            this.state.book.loader().then(data => this.setState(s => ({ ...s, book: data })))
        }
    }

    filterAction: LibraryFilter = (library: Library) => (bookFilter: BookFilter) => library.filter(bookFilter)

    render(): React.ReactNode {
        if (this.state.book.kind != 'idle') {
            return <BookDetail
                book={this.state.book}
                onGoBack={() => this.setState(s => ({ ...s, book: Idle() }))}
                onLoaded={data => this.setState(s => ({ ...s, book: data }))}
                onRetry={() => { }}
            />
        }

        if (this.state.library.kind != 'fullfilled') {
            return <DataLoader<Library>
                data={this.state.library}
                onLoaded={data => this.setState(s => ({ ...s, library: data }))}
                onRetry={() => this.setState(s => ({ ...s, library: Pending(getAllBooks) }))}
            />
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
                    this.state.library.kind == 'fullfilled' &&
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