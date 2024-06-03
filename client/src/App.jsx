import { useEffect, useState } from 'react'
import personService from './services/person'

import './App.css'
import { AxiosError } from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)

  const showNotification = (message, variant) => {
    setNotification({ message, variant: variant ?? 'success' })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

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
      personService
        .update(updatedPerson)
        .then(() => {
          const copy = [...persons]
          const index = copy.findIndex(({ id }) => id === updatedPerson.id)

          copy[index] = updatedPerson

          setPersons(copy)
        })
        .then(() => showNotification(`Updated ${person.name}`))
        .catch(error => {
          if (error instanceof AxiosError && error.response.data?.error) {
            return showNotification(error.response.data.error, 'error')
          }

          showNotification(
            `Can not update. Information of ${person.name} has been removed from the server`,
            'error'
          )
        })
      return
    }

    personService
      .create(person)
      .then(res => setPersons(persons.concat(res.data)))
      .then(() => showNotification(`Added ${person.name}`))
      .catch(error => showNotification(error.response.data.error, 'error'))
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter(({ id }) => id !== person.id)))
        .catch(() => {
          showNotification(
            `Information of ${person.name} has already been removed from the server`,
            'error'
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification?.message ?? null}
        variant={notification?.variant}
      />
      <Filter handleChange={e => setSearchQuery(e.currentTarget.value)} />

      <h2>add new</h2>
      <PersonForm handleSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} handleDelete={handleDelete} />
    </div>
  )
}

function Notification({ message, variant }) {
  if (message === null) {
    return null
  }

  return <div className={variant}>{message}</div>
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
