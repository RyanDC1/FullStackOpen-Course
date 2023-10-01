const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = 3001
 
morgan.token('request', (request) => ['POST', 'PUT'].includes(request.method) ? JSON.stringify(request.body) : " ")

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let contacts = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateUniqueId = () => {
    const maxId = contacts.length > 0 ? Math.max(...contacts.map(s => s.id)) : -1
    return maxId + 1
}

app.get('/api/info', (request, response) => {
    response.send(`Phonebook has info for ${contacts.length} people <br/> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const contactId = request.params.id
    const contact = contacts.find(s => String(s.id) === contactId)
    if (contact) {
        response.json(contact)
    }
    else {
        response.status(404).json({
            error: 'Contact not found'
        })
    }
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body || {}

    if(name == null || number == null)
    {
        return response.status(400).json({
            error: "Invalid post data, name and number are required"
        })
    }

    const personExists = contacts.find(s => s.name === name)
    if(personExists)
    {
        return response.status(400).json({
            error: `Contact with name ${name} already exists`
        })
    }

    const id = generateUniqueId()

    contacts.push({
        name,
        number,
        id
    })

    response.json(contacts)
})

app.delete('/api/persons/:id', (request, response) => {
    const contactId = request.params.id
    contacts = contacts.filter(s => String(s.id) !== contactId)

    response.json(contacts)
})