/*const express = require('express')
const port = 3000

const app = express()

app.get('/users', (request, response) =>{
    return response.send('Hello Node')
})


app.listen(3000, () =>{
    console.log(`🚀 Server started on port ${port}`)
})*/

/* QUERY PARAMS => meusite.com/users?name=felipe&age=38     // filtros
ROUTE PARAMS => /user/2    // buscar, deletar ou atualizar algo específico
GET    => BUSCAR INFORMAÇÃO NO BACK-END
POST   => CRIAR INFORMAÇÃO NO BACK-END
PUT / PATCH   => ALTERAR/ATUALIZAR INFORMAÇÃO NO BACK-END
DELETE  => DELETAR INFORMAÇÃO NO BACK-END
MIDDLEWARE => INTERCEPTADOR - tem o poder de parar ou alterar dados de requisição
*/

// QUERY PARAMS

/* const express = require('express')
const port = 3000

const app = express()

app.get('/users', (request, response) =>{
    const name = request.query.name
    const age = request.query.age
    // ou const {name, age} = request.query  ( USAR DESSA FORMA - destruction assingment)

    console.log(name, age)
    return response.json({name, age})
})


app.listen(3000, () =>{
    console.log(`🚀 Server started on port ${port}`)
})*/

// ROUTE PARAMS

/*const express = require('express')
const port = 3000

const app = express()

app.get('/users/:id', (request, response) => {

    const {id} = request.params

    console.log(id)

    return response.json({id})
})


app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)
})*/

// REQUEST BODY

/*const express = require('express')

const port = 3000
const app = express()
app.use(express.json())

app.get('/users', (request, response) => {
    const {name, age} = request.body

    return response.json({ name, age })
})


app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)
})*/

// EXERCÍCIO


const { request } = require('express')
const express = require('express')
const uuid = require('uuid')


const port = 3000
const app = express()
app.use(express.json())


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser
    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})




app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)

})

