const { randomUUID } = require("node:crypto")
const bcrypt = require('bcrypt')

const users = [
    {id: '1' , name: 'Iggor Paz' , email: 'iggorpaz@email.com' , password:'12345'},
    {id: '2', name: 'Pollyana Cristina' , email: 'polly@email.com.br' , password: '098765'}
]

module.exports = {

    //funções para agilizar o processo de busca, validação e criação do email

    getAllUsers: () => users,

    getUsersById : (id) => users.find(user => user.id === id),

    getUsersByEmail : (email) => users.find(user => user.email === email),

    createUser : (name,email,password) => {
        const newUser = {
            id : randomUUID(),
            name,
            email,
            password : bcrypt.hashSync(password,10)
        }
        users.push(newUser)
        return newUser
    }

}
