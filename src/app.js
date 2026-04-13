const express = require("express")
const path = require("node:path")
const dotenv = require("dotenv")
const authRouter = require("./routes/auth")
const apiRouter = require("./routes/api")
const ErrorMiddleware = require("./middlewares/ErrorMiddleware")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))

app.use("/auth", authRouter)
app.use("/api", apiRouter)

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

app.use(ErrorMiddleware)

module.exports = app
