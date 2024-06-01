/* eslint-disable */
import express, { json } from 'express'
import morgan, { token } from 'morgan'
import cors from 'cors'

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

app.get('/api/persons', (_, res) => res.json(persons))
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

app.post('/api/persons', (req, res) => {
  const person = { ...req.body }

  if (!person) {
    res.status(400).json({ error: 'body must not be empty' }).end()
    return
  }

  if (!('number' in person)) {
    res.status(400).json({ error: 'number must be in body' }).end()
    return
  }

  if (!('name' in person)) {
    res.status(400).json({ error: 'name must be in body' }).end()
    return
  }

  if (persons.includes(person.name)) {
    res.status(400).json({ error: 'name is already in phonebook' }).end()
    return
  }

  person.id = Math.random() * 100

  persons = persons.concat(person)

  res.status(201).json(person).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id != id)

  res.status(204).end()
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
