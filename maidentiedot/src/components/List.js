import React from 'react'

const List = (props) => {
    if (props.show.length > 1 && props.show.length < 11) {
        return (
            <div>
                <ul>
                    {props.show.map((country, i) => (
                        <li key={i}>
                            {country.name} <button value={country.name} onClick={props.handleClick}>show</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default List