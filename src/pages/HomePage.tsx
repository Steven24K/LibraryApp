import React = require("react")
import { BookProps, getFetch, Library } from "../App"
import { ApiData, Idle, Pending } from "../dataLoaders"
import { DataLoader } from "../DataLoader"
import { NavLink } from "react-router"
import { NavBar } from "../shared/NavBar"

type HomePageState = {
    library: ApiData<Library>
}

const getAllBooks = async (): Promise<ApiData<Library>> => getFetch(`/api/Library/GetAll`)


export const HomePage = () => {
    const [search, setSearch] = React.useState<string | number>("")
    const [selectedFilter, setSelectedFilter] = React.useState<BookProps>("title")
    const [state, setState] = React.useState<HomePageState>({ library: Idle() })
    const [filteredBooks, setFilteredBooks] = React.useState<Library>([])

    const onSearch = () => {
        if (state.library.kind === 'fullfilled') {
            if (search === '') {
                setFilteredBooks([])
                return
            }
            const searchStr = search.toString().toLowerCase()
            const filtered = state.library.data.filter(book => {
                if (selectedFilter === 'year') {
                    return book[selectedFilter].toString() === searchStr
                }
                return book[selectedFilter].toLowerCase().includes(searchStr)
            })
            setFilteredBooks(filtered)
        }
    }

    const handleRefresh = () => {
        setFilteredBooks([])
        setSearch('')
        setState(s => ({ ...s, library: Pending(getAllBooks) }))
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        if(e.target.value === '')
            setFilteredBooks([])
    }

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
            <select defaultValue={selectedFilter} onChange={e => setSelectedFilter(e.target.value as BookProps)}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
            </select>
            <input type="text" name="search" value={search} placeholder={`Search books on ${selectedFilter}`} onChange={handleChangeSearch}/>
            <button onClick={onSearch} disabled={search == ""}>Search</button>
            <button onClick={handleRefresh}>Refresh</button>
        </div>

        <h2>{(filteredBooks.length > 0 ? filteredBooks : state.library.data).length} books found</h2>

        <ul className="book-list">
            {
                (filteredBooks.length > 0 ? filteredBooks : state.library.data).map(book =>
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