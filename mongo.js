const mongoose = require('mongoose')
const { Person } = require('./models/people.js')

if (!process.argv[2]) {
  console.error('Missing password')
  process.exit(1)
}

const [password, name, number] = process.argv.slice(2)

const url = `mongodb+srv://root:${password}@fs.fpa18iz.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

function newPerson() {
  const person = new Person({
    name,
    number
  })

  person.save().then(document => {
    console.log(`added ${document.name} number ${document.number} to phonebook`)
    mongoose.connection.close()
  })
}

function printPersons() {
  Person.find({}).then(documents => {
    console.log('phonebook:')
    for (const person of documents) {
      console.log(person.name, person.number)
    }

    mongoose.connection.close()
  })
}

if (name && number) {
  newPerson()
} else {
  printPersons()
}
