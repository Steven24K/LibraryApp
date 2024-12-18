import { Book } from "../App"
import { DataLoader } from "../DataLoader"
import { ApiData } from "../dataLoaders"

interface BookDetailProps {
    book: ApiData<Book>
    onGoBack: () => void
    onLoaded: (data: ApiData<Book>) => void
    onRetry: () => void
}

export const BookDetail = (props: BookDetailProps) => {
    if (props.book.kind != 'fullfilled') return <DataLoader<Book>
        data={props.book}
        onLoaded={props.onLoaded}
        onRetry={props.onRetry}
    />
    return <div>
        <button onClick={props.onGoBack}>Go back to overview</button>
        <h1>{props.book.data.title}</h1>
        <p>Genre: {props.book.data.genre}</p>
        <p>Autor: {props.book.data.author}</p>
        <p>Year published: {props.book.data.year}</p>
    </div>
}