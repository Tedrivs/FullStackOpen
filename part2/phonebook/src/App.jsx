import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personsService from './Services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then(personsResult => setPersons(personsResult))
  }, [])

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
    const existingPerson = persons.filter(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (existingPerson.length > 0) {
      if (window.confirm((`${newName} is already added to phonebook, replace the old number with a new one`))) {
        personsService.update(existingPerson[0].id, personObject).then(result => {
          setPersons(persons.map(person => person.id === result.id ? result : person))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {

      personsService.create(personObject).then(result => {
        setPersons(persons.concat(result))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const onDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personsService.deletePerson(person.id).then(setPersons(persons.filter(x => x.id != person.id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={onFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={onSubmit} newName={newName} newNumber={newNumber} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredNumbers} onDelete={onDelete} />
    </div>
  )
}

export default App