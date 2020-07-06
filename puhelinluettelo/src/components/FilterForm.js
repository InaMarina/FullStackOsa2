import React from 'react'

const FilterForm = (props) => {
    return (
        <div>
        {props.text} <input value={props.value}
          onChange={props.onChange} />
      </div>
    )
}

export default FilterForm