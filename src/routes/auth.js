const express = require ('express')
const authController = require('../Controller/authController')
const { ensureauth } = require('../middlewares/authMiddlewares')
const authRouter = express.Router()

authRouter.post ('/register' , authController.register)
authRouter.post ('/login' , authController.login)

authRouter.get ('/test' , ensureauth ,(req,res) => {
    res.json({message: "TEST OK"})
})

module.exports = authRouter