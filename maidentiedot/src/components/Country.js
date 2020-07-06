import React from 'react'

const Country = (props) => {
    if (props.show.length === 1) {
        return (
            <div>
                <h2>{props.countryName}</h2>
                <p>Capital: {props.capital}</p>
                <p>Population: {props.population}</p>
                <h3>languages</h3>
                <ul>
                    {props.languages.map((language, i) => (
                        <li key={i}>
                            {language}
                        </li>
                    ))}
                </ul>
                <img src={props.flagAddress} alt='countryflag' />
                <h2>Weather in {props.capital}</h2>
                <h5>Temperature: {props.temperature}</h5>
                <img src={props.weatherPic} alt='cWeather icon' />
                <h5>Wind: {props.windspeed} mph direction {props.winddirection}</h5>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default Country