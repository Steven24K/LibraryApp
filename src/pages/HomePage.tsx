import { BookProps, Library } from "../App"

type HomePageProps = {
    selectedFilter: BookProps
    search: string | number
    library: Library
    onRefresh: () => void
    onSearch: () => void

}

export const HomePage = (props: HomePageProps) => {
    const { library, search, selectedFilter, onRefresh, onSearch } = props
    return <div className="main">
        <h1>Welcome to the library</h1>
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
            <button onClick={onRefresh}>Refresh</button>
        </div>



        <h2>{library.length} books found</h2>


        <ul className="book-list">
            {
                library.map(book =>
                    <li key={book.id}
                        onClick={() => {
                            // TODO: Make link with react router
                            // URL /book/{id}
                        }}
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