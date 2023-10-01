const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

if (process.argv.length<3) {
    console.log('Password not provided, Program terminating')
    process.exit(1)
  }

  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = process.env.mongoDbUrl.replace("<password>", password)
  console.log(url)
  // mongoose.set('strictQuery', false)

  mongoose.connect(url)

  // Define database schema
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  //create model
  const personModel = mongoose.model('Person', personSchema)

  if(name && number)
  {
    const contact = new personModel({
      name,
      number
    }) 
    
    contact.save().then((response) => {
      console.log(`added ${response.name} number ${response.number} to phonebook`)
      mongoose.connection.close()
    })
  }
  else {
    personModel.find({}).then((response) => {
      console.log(response)
      response.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  }
