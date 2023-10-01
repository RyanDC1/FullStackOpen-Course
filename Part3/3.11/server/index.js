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

let notes = [
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
    const maxId = notes.length > 0 ? Math.max(...notes.map(s => s.id)) : -1
    return maxId + 1
}

app.get('/api/info', (request, response) => {
    response.send(`Phonebook has info for ${notes.length} people <br/> ${new Date()}`)
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const noteId = request.params.id
    const note = notes.find(s => String(s.id) === noteId)
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).json({
            error: 'Note not found'
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

    const personExists = notes.find(s => s.name === name)
    if(personExists)
    {
        return response.status(400).json({
            error: `Contact with name ${name} already exists`
        })
    }

    const id = generateUniqueId()

    notes.push({
        name,
        number,
        id
    })

    response.json(notes)
})

app.delete('/api/persons/:id', (request, response) => {
    const noteId = request.params.id
    notes = notes.filter(s => String(s.id) !== noteId)

    response.json(notes)
})