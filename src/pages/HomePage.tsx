import React = require("react")
import { BookProps, getFetch, Library } from "../App"
import { ApiData, Idle, Pending } from "../dataLoaders"
import { DataLoader } from "../DataLoader"
import { NavLink } from "react-router"
import { NavBar } from "../shared/NavBar"

type HomePageProps = {
    selectedFilter: BookProps
    search: string | number
    onSearch: () => void
}

type HomePageState = {
    library: ApiData<Library>
}

const getAllBooks = async (): Promise<ApiData<Library>> => getFetch(`/api/Library/GetAll`)


export const HomePage = (props: HomePageProps) => {
    const { search, selectedFilter, onSearch } = props
    const [state, setState] = React.useState<HomePageState>({ library: Idle() })

    if (state.library.kind == 'idle') {
        setState(s => ({ ...s, library: Pending(getAllBooks) }))
    }

    if (state.library.kind != 'fullfilled') {
        return <DataLoader<Library>
            data={state.library}
            onLoaded={data => setState(s => ({ ...s, library: data }))}
            onRetry={() => setState(s => ({ ...s, library: Pending(getAllBooks) }))}
        />
    }

    return <div className="main">
        <h1>Welcome to the library</h1>

        <NavBar />

        <div className="filters">
            <label>Filter on:</label>
            <select defaultValue={selectedFilter}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>
            <input type="text" name="search" value={search} placeholder={`Search books on ${selectedFilter}`} />
            <button onClick={onSearch} disabled={search == ""}>Search</button>
            <button onClick={() => setState(s => ({ ...s, library: Pending(getAllBooks) }))}>Refresh</button>
        </div>



        <h2>{state.library.data.length} books found</h2>


        <ul className="book-list">
            {
                state.library.data.map(book =>
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
        </ul>
    </div>
}