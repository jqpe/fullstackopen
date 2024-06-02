/* eslint-disable */
import cors from 'cors'
import express, { json } from 'express'
import morgan, { token } from 'morgan'

import { connect } from './db.js'
import { Person } from './models/people.js'

await connect()
const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.use(json())
app.use(cors())

// if token is falsy morgan prints out - for all requests (i.e. GET requests as well)
// we could write some spaghetti to work around this, but nah
token('body', req => {
  return req.method === 'POST' && JSON.stringify(req.body)
})

// morgan does not export the tiny configuration anywhere so hard-code it.
// see https://github.com/expressjs/morgan/blob/c68d2eab4c6a5d9940895a6d1614964d44358642/index.js#L177
// there doesn't seem to be a way to extend the predefined formats
const tiny = ':method :url :status :res[content-length] - :response-time ms'

app.use(morgan(`${tiny} :body`))

app.use(express.static('dist'))

app.get('/api/persons', async (_, res) => res.json(await Person.find({})))
app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params

  try {
    const person = persons.find(person => person.id == id)

    if (person) {
      return res.json(person)
    }
  } catch {}

  res.status(404)
  res.end()
})

app.post('/api/persons', async (req, res, next) => {
  const person = { ...req.body }

  if (!person) {
    return next(new TypeError('body must not be empty'))
  }

  if (!('number' in person)) {
    return next(new TypeError('number must be in body'))
  }

  if (!('name' in person)) {
    return next(new TypeError('name must be in body'))
  }

  if (persons.includes(person.name)) {
    return next(new TypeError('name is already in phonebook'))
  }

  let _person = person

  {
    const person = new Person({
      name: _person.name,
      number: _person.number
    })

    _person = await person.save()
  }

  persons = persons.concat(_person)

  res.status(201).json(_person).end()
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(next)
})

app.get('/info', (_, res) => {
  // minimal valid html according to w3
  const html = `<!doctype html>
  <html lang="en">
    <head>
    <title>info</title>
    </head>
    <body>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toISOString()}</p>
    </body>
  </html>
  `

  res.send(html)
})

const errorHandler = (error, _, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error instanceof TypeError) {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
