import { useEffect, useState } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(res => setPersons(res.data))
  }, [])

  const [searchQuery, setSearchQuery] = useState('')

  const shownPersons = searchQuery
    ? persons.filter(({ name }) => {
        return new RegExp(searchQuery, 'gi').test(name)
      })
    : persons

  const onSubmit = person => {
    personService
      .create(person)
      .then(res => setPersons(persons.concat(res.data)))
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(res => setPersons(persons.filter(({ id }) => id !== res.data.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={e => setSearchQuery(e.currentTarget.value)} />

      <h2>add new</h2>
      <PersonForm persons={persons} handleSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleDelete={handleDelete} />
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

function Persons({ persons, handleDelete }) {
  return (
    <table>
      <tbody>
        {persons.map(person => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  )
}

function Person({ person, handleDelete }) {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => handleDelete(person)}>delete</button>
      </td>
    </tr>
  )
}

export default App
