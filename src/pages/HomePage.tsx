import React = require("react")
import { BookProps, getFetch, Library } from "../App"
import { ApiData, Idle, Pending } from "../dataLoaders"
import { DataLoader } from "../DataLoader"
import { NavLink } from "react-router"
import { NavBar } from "../shared/NavBar"

type HomePageState = {
    library: ApiData<Library>
    selectedFilter: BookProps
    search: string | number
}

const getAllBooks = (property?: BookProps, search?: string | number) => async (): Promise<ApiData<Library>> => {
    let url = `/api/Library/GetAll/`
    if (property && search) url += `${property}/${search}`
    return getFetch(url)
}


export const HomePage = () => {
    const [state, setState] = React.useState<HomePageState>({
        library: Idle(),
        search: '',
        selectedFilter: 'author'
    })

    if (state.library.kind == 'idle') {
        setState(s => ({ ...s, library: Pending(getAllBooks()) }))
    }

    return <div>
        <h1>Welcome to the library</h1>

        <NavBar />

        <div className="filters">
            <label>Filter on:</label>
            <select defaultValue={state.selectedFilter}
                onChange={event => setState({ ...state, selectedFilter: event.target.value as BookProps })}

            >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>
            <input
                value={state.search}
                onChange={event => setState({ ...state, search: event.target.value })}
                type="text"
                name="search"
                placeholder={`Search books on ${state.selectedFilter}`}
            />
            <button onClick={() =>
                setState(s => ({ ...s, library: Pending(getAllBooks(state.selectedFilter, state.search)) }))
            } disabled={state.search == ""}>Search</button>
            <button onClick={() => setState(s => ({ ...s, library: Pending(getAllBooks()) }))}>Refresh</button>
        </div>



        {state.library.kind == 'fullfilled' && <h2>{state.library.data.length} books found</h2>}

        <DataLoader<Library>
            data={state.library}
            onLoaded={data => setState(s => ({ ...s, library: data }))}
            onRetry={() => setState(s => ({ ...s, library: Pending(getAllBooks()) }))}
        />

        {state.library.kind == 'fullfilled' && <ul className="book-list">
            {
                state.library.data
                    .map(book =>
                        <li key={book.id}>
                            <NavLink to={`/book/${book.id}`}>
                                <h2>{book.title} </h2>
                                <p className="author">Author: {book.author}</p>
                                <p className="genre">Genre: {book.genre}</p>
                                <p className="published">Published in: {book.year}</p>
                            </NavLink>
                        </li>
                    )
            }
        </ul>}
    </div>
}