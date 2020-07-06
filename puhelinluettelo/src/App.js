import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Personlist from './components/Personlist'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [show, setShow] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(personsFromDb => {
        setPersons(personsFromDb)
        setShow(personsFromDb)
      })
  }, [])

  const Notification = ({message}) =>{
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person['name'] === newName).length > 0) {
      const personID = persons.filter(person => person['name'] === newName)[0].id

      if(window.confirm(`${newName} is already added to phonebook, replace the number with a new one?`)){
        axios.put(`http://localhost:3001/persons/${personID}`, personObject)
        .then(() => {
          return axios.get(`http://localhost:3001/persons/`)
        })
        .then(dataReturnedFromDB => {
          const personsAfterUpdate = dataReturnedFromDB.data
          setPersons(personsAfterUpdate)
          setShow(personsAfterUpdate)
          setErrorMessage(`Updated phonenumber for ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })
        setNewName('')
        setNewNumber('')

      }
    } else {
      personService
        .create(personObject)
        .then(returnedData => console.log(returnedData))

        personService
        .getAll()
        .then(personsFromDb => {
          setPersons(personsFromDb)
          setShow(personsFromDb)
          setErrorMessage(`Added ${newName} to the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')

    }
  }
  const deleteContact = (id, name) => {
    console.log('deletebutton for preson id:', id)
    if (window.confirm(`Do you really want to delete ${name}?`)) {

      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          return axios.get(`http://localhost:3001/persons/`)
        })
        .then(dataReturnedFromDB => {
          const personsAfterDelete = dataReturnedFromDB.data
          setPersons(personsAfterDelete)
          setShow(personsAfterDelete)
          setErrorMessage(`Deleted ${name} from the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${name} was already removed from the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleFiltering = (event) => {
      setNewFilter(event.target.value)

      if (event.target.value.length > 0) {

        const filteredList = [...persons].filter(person => person['name'].startsWith(event.target.value))
        setShow(filteredList)
      } if (event.target.value.length === 0) {
        setShow(persons)
      }
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage}/>
        <FilterForm text={'filter shown with'} value={newFilter} onChange={handleFiltering} />
        <h2>Add a new</h2>

        <PersonForm
          onSubmit={addPerson}
          text1={'name: '} value1={newName} onChange1={handleNameChange}
          text2={'number: '} value2={newNumber} onChange2={handleNumberChange} />

        <h2>Numbers</h2>
        <Personlist persons={show} onclick={deleteContact} />
      </div>
    )
  }
  
  export default App
