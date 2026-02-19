const jwt = require('jsonwebtoken') // encriptar a senha
const usersModel = require('../models/users-model')

module.exports = {
    ensureauth: (req,res,next) => {
        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({message: "Não autorizado"})
        }
        const token = authHeader.split (' ')[1] //separar o token pelos espaços
        try {
            const {id} = jwt.verify(token,process.env.JWT_SECRETKEY)
            const user = usersModel.getUsersById(id)
            if(!user) {
                return res.status(404).json ({message: "Usuário não encontrado"})
            }
            req.user = user
            next()
            
        } catch (error) {
            return res.status(401).json({message:"Token Inválido"})
        }
    }
}