const express = require("express")
const booksController = require("../Controller/booksController")
const loansController = require("../Controller/loansController")
const { ensureauth } = require("../middlewares/authMiddlewares")
const apiRouter = express.Router()

apiRouter.get("/books", booksController.index)
apiRouter.get("/books/:id", booksController.show)

apiRouter.post("/books", booksController.save)
apiRouter.put("/books/:id", booksController.update)
apiRouter.delete("/books/:id", booksController.delete)

apiRouter.get("/loans", loansController.index)
apiRouter.get("/loans/:id", loansController.show)
apiRouter.post("/loans", ensureauth, loansController.save)
apiRouter.post("/loans/:id/return", loansController.return)

module.exports = apiRouter
