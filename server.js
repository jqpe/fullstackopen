const express = require('express')
const morgan = require('morgan')

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

app.use(express.json())
app.use(morgan('tiny'))

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
  const person = req.body

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

  res.status(201).end()
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
