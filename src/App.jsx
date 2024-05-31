import { useEffect, useState } from 'react'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService.getAll().then(res => setPersons(res.data))
  }, [])

  const shownPersons = searchQuery
    ? persons.filter(({ name }) => {
        return new RegExp(searchQuery, 'gi').test(name)
      })
    : persons

  const onSubmit = person => {
    const phonebookPerson = persons.find(({ name }) => name === person.name)

    if (
      phonebookPerson &&
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedPerson = { ...phonebookPerson, ...person }
      personService.update(updatedPerson).then(() => {
        const copy = [...persons]
        const index = copy.findIndex(({ id }) => id === updatedPerson.id)

        copy[index] = updatedPerson

        setPersons(copy)
      })
      return
    }

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
      <PersonForm handleSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleDelete={handleDelete} />
    </div>
  )
}

function PersonForm({ handleSubmit }) {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

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
