/* eslint-disable */
import cors from 'cors'
import express, { json } from 'express'
import morgan, { token } from 'morgan'

import { connect } from './db.js'
import { Person } from './models/people.js'

await connect()
const app = express()

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
app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then(person => {
      return res.json(person)
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body) {
    return next(new TypeError('body must not be empty'))
  }

  if (!('number' in req.body)) {
    return next(new TypeError('number must be in body'))
  }

  if (!('name' in req.body)) {
    return next(new TypeError('name must be in body'))
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  person
    .save()
    .then(() => res.status(201).json(person))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  if (!req.body) {
    return next(new TypeError('body must not be empty'))
  }

  if (!('number' in req.body)) {
    return next(new TypeError('number must be in body'))
  }

  if (!('name' in req.body)) {
    return next(new TypeError('name must be in body'))
  }

  Person.findByIdAndUpdate(id, req.body)
    .then(document => res.json(document))
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(next)
})

app.get('/info', async (_, res, next) => {
  const persons = await Person.find({}).catch(next)

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
