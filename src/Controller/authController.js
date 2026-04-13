const usersModels = require ('../models/users-model')
const jwt = require ('jsonwebtoken') // assinatura e verificacao do token
const bcrypt = require ('bcrypt') // encriptar a senha ,

module.exports = {
    
    //POST /auth/register
    register : (req,res) => {
        const { name, email, password } = req.body

        if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({message:'Todos os campos são obrigatórios'})
        }

        const existingUser = usersModels.getUsersByEmail(email)

        if(existingUser){
            return res.status(400).json({message:'E-mail já cadastrado'})
        }
        const newUser = usersModels.createUser(name,email,password)
        return res.status(201).json({...newUser , password : undefined})
    },


    //POST /auth/login
    login : (req,res) => {
        const { email , password} = req.body

        if(typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({message:'Todos os campos são obrigatórios'})
        }

        const user = usersModels.getUsersByEmail(email)
         if(!user){
            return res.status(404).json({message:'Usuario não encontrado'})
        }

        const isValidPassoword = bcrypt.compareSync(password , user.password)
        if(!isValidPassoword) {
            return res.status(401).json({message: "senha incorreta"})
        }

        const payload = {id: user.id , email: user.email, name: user.name}
        const token = jwt.sign(payload , process.env.JWT_SECRETKEY , {expiresIn: "1d"})
        res.json(token)
    }

}
