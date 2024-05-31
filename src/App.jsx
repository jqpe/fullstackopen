import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const API_BASE = 'http://localhost:3001'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    const res = axios.get(new URL('/persons', API_BASE))
    res.then(({ data }) => {
      setPersons(data)
    })
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  const shownPersons = searchQuery
    ? persons.filter(({ name }) => {
        return new RegExp(searchQuery, 'gi').test(name)
      })
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={e => setSearchQuery(e.currentTarget.value)} />

      <h2>add new</h2>
      <PersonForm
        persons={persons}
        handleSubmit={newPerson => setPersons([...persons, newPerson])}
      />
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
