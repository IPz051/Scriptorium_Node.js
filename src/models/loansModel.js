const { randomUUID } = require("node:crypto")
const HttpError = require ('../error/HttpError')
const booksModel = require('./booksModel')

let loans = [{

    id: randomUUID(),
    userId: '1' ,
    bookId: '1' ,
    loanDate: new Date('2025-01-01'),
    returnDate: null,
    isReturned: false,
    isLate: true

}]

module.exports = {
    getAllLoan : () => loans,
    
    getLoanById : (id) => loans.find(loan => loan.id === id),

    createLoan : (user , book ) => {
        if(book.quantityAvalible < 1 ) throw new HttpError (404 , 'não há exemplares disponíveis!')
        
        const today = new Date()
        const returnDate = new Date()
        returnDate.setDate(today.getDate() + 14)

        const newLoan = {
            id: randomUUID(),
            userId: user.id,
            bookId: book.id,
            loanDate: today,
            returnDate,
            isReturned: false,
            isLate: false
        }
        loans.push(newLoan)
        booksModel.takeBook (book.id)
        return newLoan
    },
    returnLoan : (id) => {
        const loanIndex = loans.findIndex(loan => loan.id === id)
        if(loanIndex === -1 ){
            throw new HttpError ( 404 , 'Emprestimo não encontrado')
        }
         
        const loan = loans[loanIndex]
        if(loan.isReturned) return loan

        loan.isReturned = true

        const today = new Date()
        const limitDate = new Date (loan.returnDate)
        loan.isLate = today > limitDate
        loan.returnDate = today

        booksModel.returnBook(loan.bookId)

        return loan

        
    }
}
