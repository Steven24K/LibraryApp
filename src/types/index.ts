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

export type Func<a, b> = (_: a) => b

export type BookPredicate<FilterKey extends BookProps> = Func<Book[FilterKey], boolean> // i.e. title => title == "Advanced Types in Typescript"

export type BookFilter = Func<Book, BookPredicate<BookProps>> // i.e. book => title => book.title == title

export type LibraryFilter = Func<Library, Func<BookFilter, Library>> // i.e. books => book => title => book.title == title
