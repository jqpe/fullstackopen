const { set, connect, model, Schema, connection } = require('mongoose')

if (!process.argv[2]) {
  console.error('Missing password')
  process.exit(1)
}

const [password, name, number] = process.argv.slice(2)

const url = `mongodb+srv://root:${password}@fs.fpa18iz.mongodb.net/?retryWrites=true&w=majority`

set('strictQuery', false)

connect(url)

const personSchema = new Schema({
  number: String,
  name: String
})

const Person = model('Person', personSchema)

function newPerson() {
  const person = new Person({
    name,
    number
  })

  person.save().then(document => {
    console.log(`added ${document.name} number ${document.number} to phonebook`)
    connection.close()
  })
}

function printPersons() {
  Person.find({}).then(documents => {
    console.log('phonebook:')
    for (const person of documents) {
      console.log(person.name, person.number)
    }

    connection.close()
  })
}

if (name && number) {
  newPerson()
} else {
  printPersons()
}
