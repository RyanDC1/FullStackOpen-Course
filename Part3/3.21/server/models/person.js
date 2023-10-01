const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

//Define url in .env file
const url = process.env.MONGO_URL
mongoose.set('strictQuery', true) // only allow fields defined in schema

mongoose.connect(url).then(() =>{
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.error("MONGO_DB: An error occurred: ", error)
})

// Define database schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name should be atleast 3 characters long']
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[0-9]{2,3}?-[0-9]/.test(value) && value?.length > 8
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (document, properties) => {
        delete properties._id
    }
})

//create model
module.exports = mongoose.model('Person', personSchema)