import React = require("react");
import '../static/css/site.css'
import { ApiData, FullFilled, Rejected } from "./dataLoaders";
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

interface AppProps { }

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

    render(): React.ReactNode {
        return <div className="main">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    }
}