import React = require("react")
import { Book, getFetch } from "../App"
import { DataLoader } from "../DataLoader"
import { ApiData, Idle, Pending } from "../dataLoaders"
import { NavBar } from "../shared/NavBar"
import { NavLink, useParams } from "react-router"

interface BookState {
    book: ApiData<Book>
}

const getBookById = (id: string) => async (): Promise<ApiData<Book>> => getFetch(`/api/Library/GetBookById/${id}`)

type Params = {
    id: string
}

export const BookDetail = () => {
    const [state, setState] = React.useState<BookState>({ book: Idle() })
    const { id } = useParams<Params>()
    if (id == undefined) return <div>No id supplied</div>
    if (state.book.kind == 'idle') {
        // How to get the ID from the route or path?
        // Or how to get any path property from the URL in Javascript?
        setState(s => ({...s, book: Pending(getBookById(id))}))
    }
    if (state.book.kind != 'fullfilled') return <DataLoader<Book>
        data={state.book}
        onLoaded={data => setState(s => ({ ...s, book: data }))}
        onRetry={() => { }}
    />
    return <div>
        <NavBar />

        <NavLink to="/" >Go back to overview</NavLink>
        <h1>{state.book.data.title}</h1>
        <p>Genre: {state.book.data.genre}</p>
        <p>Autor: {state.book.data.author}</p>
        <p>Year published: {state.book.data.year}</p>
    </div>
}