
import React = require("react");
import { Book } from "../types";

type BookDetailsProps = {
    book: Book;
    onBack: () => void;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book, onBack }) => {
    return (
        <div>
            <button onClick={onBack}>Go back to overview</button>
            <h1>{book.title}</h1>
            <p>Genre: {book.genre}</p>
            <p>Autor: {book.author}</p>
            <p>Year published: {book.year}</p>
        </div>
    );
}