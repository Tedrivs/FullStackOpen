import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredNumbers = filter.length > 0
    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    : persons

  const onFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0)
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={onFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={onSubmit} newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredNumbers} />
    </div>
  )
}

export default App