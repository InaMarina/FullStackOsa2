
import React from 'react'

const Person = ({ person, deleteContact }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

export default Person



