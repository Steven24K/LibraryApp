import React = require("react");
import '../static/css/site.css'
import { ApiData, FullFilled, Idle, Pending, Rejected } from "./dataLoaders";
import { Library, Book, BookProps, LibraryFilter, BookFilter } from './types'
import { BookDetails } from "./components/BookDetails";
import { LoadingView } from "./components/LoadingView";
import { ErrorView } from "./components/ErrorView";
import { BookListView } from "./components/BookListView";

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
        if (this.state.library.kind == 'idle') return <div className="nothing">Nothing to show yet</div>
        if (this.state.library.kind == 'pending') return <LoadingView />
        if (this.state.library.kind == 'rejected')
            return <ErrorView 
                errorMessage={this.state.library.errorMessage}
                onRetry={() => this.setState(s => ({ ...s, library: Pending(getAllBooks) }))}
            />

        if (this.state.book.kind == 'fullfilled') {
            return <BookDetails 
                book={this.state.book.data} 
                onBack={() => this.setState(s => ({...s, book: Idle()}))}
            />
        }
        if (this.state.book.kind == 'rejected') {
            return <div>{this.state.book.errorMessage}</div>
        }

        return <BookListView 
            library={this.state.library.data}
            search={this.state.search}
            selectedFilter={this.state.selectedFilter}
            onBookSelect={(book) => this.setState(s => ({ ...s, book: Pending((getBookById(book))) }))}
            onRefresh={() => this.setState(s => ({ ...s, library: Pending(getAllBooks) }))}
        />
    }
}