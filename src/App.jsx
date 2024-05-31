import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Minna Mansikka' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const shownPersons = searchQuery
    ? persons.filter(({ name }) => {
        return new RegExp(searchQuery, 'gi').test(name)
      })
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <article>
        Filter shown with{' '}
        <input onChange={e => setSearchQuery(e.currentTarget.value)} />
      </article>

      <h2>add new</h2>
      <form
        onSubmit={e => {
          e.preventDefault()

          if (persons.some(({ name }) => name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
          }

          setPersons([...persons, { name: newName, number: newNumber }])
        }}
      >
        <div>
          <div>
            name: <input onChange={e => setNewName(e.currentTarget.value)} />
          </div>
          <div>
            number:{' '}
            <input onChange={e => setNewNumber(e.currentTarget.value)} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map(person => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
