import React = require("react");
import '../static/css/site.css'
import { ApiData, FullFilled, Idle, Pending, Rejected } from "./dataLoaders";
import { DataLoader } from "./DataLoader";
import { BookDetail } from "./pages/BookDetail";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter, HashRouter, MemoryRouter, Route, Routes } from "react-router";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export type Book = {
    id: number
    title: string
    author: string
    genre: string
    year: number
}

export type BookProps = Exclude<keyof Book, "id"> //type BookProps =  "title" | "author" | "author" | "year"
// See: https://www.typescriptlang.org/docs/handbook/2/keyof-types.html 

export type Library = Book[]

type Func<a, b> = (_: a) => b

type BookPredicate<FilterKey extends BookProps> = Func<Book[FilterKey], boolean> // i.e. title => title == "Advanced Types in Typescript"

type BookFilter = Func<Book, BookPredicate<BookProps>> // i.e. book => title => book.title == title

type LibraryFilter = Func<Library, Func<BookFilter, Library>> // i.e. books => book => title => book.title == title

interface AppProps {

}

export async function getFetch<T>(url: string): Promise<ApiData<T>> {
    const response = await fetch(url)
    if (!response.ok) return Rejected(await response.text())
    return FullFilled(await response.json())
}


interface AppState {
    search: string | number
    selectedFilter: BookProps
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            search: "",
            selectedFilter: "title"
        }
    }

    filterAction: LibraryFilter = (library: Library) => (bookFilter: BookFilter) => library.filter(bookFilter)

    render(): React.ReactNode {
        return <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage
                    search={this.state.search}
                    selectedFilter={this.state.selectedFilter}
                    onSearch={() => { }}
                />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book/:id" element={<BookDetail />} />

                <Route path='*' element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    }
}