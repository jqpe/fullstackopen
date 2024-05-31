import { useState } from 'react'

// TODO: phone number so it's unique(ish)
const getUniqueId = person => {
  return person.name
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setPersons([...persons, { name: newName }])
        }}
      >
        <div>
          name: <input onChange={e => setNewName(e.currentTarget.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={getUniqueId(person)}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
