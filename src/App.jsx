import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const API_ENDPOINT = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get(API_ENDPOINT).then(res => setPersons(res.data))
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  const shownPersons = searchQuery
    ? persons.filter(({ name }) => {
        return new RegExp(searchQuery, 'gi').test(name)
      })
    : persons

  const onSubmit = person => {
    axios
      .post(API_ENDPOINT, person)
      .then(res => setPersons(persons.concat(res.data)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={e => setSearchQuery(e.currentTarget.value)} />

      <h2>add new</h2>
      <PersonForm persons={persons} handleSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  )
}

function PersonForm({ persons, handleSubmit }) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <form
      // Too much abstraction?
      onSubmit={e => {
        e.preventDefault()

        if (persons.some(({ name }) => name === newName)) {
          alert(`${newName} is already added to phonebook`)
          return
        }

        handleSubmit({ name: newName, number: newNumber })
      }}
    >
      <div>
        <div>
          name: <input onChange={e => setNewName(e.currentTarget.value)} />
        </div>
        <div>
          number: <input onChange={e => setNewNumber(e.currentTarget.value)} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function Filter({ handleChange }) {
  return (
    <article>
      Filter shown with <input onChange={handleChange} />
    </article>
  )
}

function Persons({ persons }) {
  return (
    <table>
      <tbody>
        {persons.map(person => (
          <Person key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  )
}

function Person({ person }) {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

export default App
