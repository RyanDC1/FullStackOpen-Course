const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const personService = require('./models/person')

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


app.get('/api/info', (request, response) => {
    personService.count()
    .then((result) => {
        response.send(`Phonebook has info for ${result} people <br/> ${new Date()}`)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.get('/api/persons', (request, response) => {
    personService.find({})
    .then((result) => {
        response.json(result)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.get('/api/persons/:id', (request, response) => {
    personService.findById(request.params.id)
    .then((contact) => {
        if (contact) {
            response.json(contact)
        }
        else {
            response.status(404).json({
                error: 'contact not found'
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body || {}

    if(name == null || number == null)
    {
        return response.status(400).json({
            error: "Invalid post data, name and number are required"
        })
    }

    personService.findOne({ name })
    .then((personExists) => {
        if(personExists)
        {
            return response.status(400).json({
                error: `Contact with name ${name} already exists`
            })
        }
        else {
            const person = new personService({
                name,
                number
            })
        
            person.save()
            .then((result) => {
                response.json(result)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

app.put('/api/persons/:id', (request, response) => {
    personService.findByIdAndUpdate(request.body.id, { number: request.body.number })
    .then((result) => {
        response.json(result)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    personService.findByIdAndDelete(request.params.id)
    .then((result) => {
        if(result != null)
        {
            response.status(204).json({
                message: "Contact Deleted"
            })
        }
        else {
            response.status(404).json({
                message: "Contact Not Found"
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

app.use(function(req, res){
   res.sendStatus(404);
});