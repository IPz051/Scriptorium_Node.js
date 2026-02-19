const HttpError = require('../error/HttpError')

const uuid = require('uuid').v4

let books = [
    {id: '1' , title: 'Book 1' , author: 'author 1' , quantityAvalible: 4},
    {id: '2' , title: 'Book 2' , author: 'author 2' , quantityAvalible: 2}
]

module.exports = {
    getAllBooks : () => books,
    getBooksById : (id) => {
        return books.find(book => book.id === id )
    },
    createBook: (title , author ,quantityAvalible) => {
        const newBook = {
            id: uuid(),
            title,
            author,
            quantityAvalible
        }
        books.push(newBook)
        return newBook
    },
    updateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new HttpError (404 , 'Livro não encontrado')
        books[bookIndex] = {...books[bookIndex], ...updatedBook}
        return books[bookIndex]
    },
    deleteBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new HttpError (404 , 'Livro não encontrado')
        const deletedBook = books[bookIndex] 
        books = books.filter(book => book.id !== id)
        return deletedBook
    },
    takeBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new HttpError (404 , 'Livro não encontrado')
        if (books[bookIndex].quantityAvalible < 1) throw new HttpError(400, 'Sem exemplares disponíveis')
        books[bookIndex].quantityAvalible -= 1  
    },
    returnBook: (id) => {
        const bookIndex = books.findIndex(book => book.id === id)
        if(bookIndex === -1) throw new HttpError (404 , 'Livro não encontrado')
        books[bookIndex].quantityAvalible += 1  
    }
}
