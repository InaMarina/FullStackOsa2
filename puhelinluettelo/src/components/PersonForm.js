import React from 'react'

const PersonForm = (props) => {
  return (
    <>
    <form onSubmit={props.onSubmit}>
        <Input text={props.text1} value={props.value1} onChange={props.onChange1} />
        <Input text={props.text2} value={props.value2} onChange={props.onChange2} />
        <button type="submit">add</button>
    </form>
    </>
  )
}

const Input = (props) => {
    return (
        <div>
        {props.text} <input value={props.value}
          onChange={props.onChange} />
      </div>
    )
}

export default PersonForm