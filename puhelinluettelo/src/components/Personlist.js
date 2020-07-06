import React from 'react'
import Person from './Person'

const Personlist = ({ persons, onclick }) => {
  return (
    <>
      <ul>
        {persons.map(person =>
          <div key={person.id}>
            <Person person={person} />
            <button onClick={()=>onclick(person.id, person.name)}>delete</button>
          </div>
        )}
      </ul>
    </>
  )
}

export default Personlist