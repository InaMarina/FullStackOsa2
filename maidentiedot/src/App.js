import React, { useState, useEffect } from 'react';
import axios from 'axios'
import List from './components/List'
import Country from './components/Country'
import './App.css'
import './index.css'

function App() {
  const [tooMany, setTooMany] = useState('Too many matches, specify another filter')
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState([])
  const [countryName, setCountryName] = useState('')
  const [capital, setCapital] = useState('')
  const [population, setPopulation] = useState('')
  const [languages, setLanguages] = useState([])
  const [flagAddress, setFlagAddress] = useState([])
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [windDir, setWindDir] = useState('')
  const [wetherpicAddress, setWeatherpicAddress] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log(response.data)
      setCountries(response.data)
      setShow([])
    })
  }, [])

  const handleClick = (e) => {
    console.log('button clicked')
    console.log(e.target.value)
    setFilter(e.target.value)
    handleChange(e)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

    const listforfiltering = [...countries]
    if (event.target.value.length > 0) {
      const filteredList = listforfiltering.filter(country => country['name'].includes(event.target.value))

      if (filteredList.length < 11 && filteredList.length > 1) {
        console.log(filteredList)
        setShow(filteredList)
        setTooMany('')
      } else if (filteredList.length === 1) {

        const nameOfCountry = filteredList[0].name
        setCountryName(nameOfCountry)
        const capitalOfCountry = filteredList[0].capital
        setCapital(capitalOfCountry)
        const populationOfCountry = filteredList[0].population
        setPopulation(populationOfCountry)
        const languagesOfCountry = filteredList[0].languages.map(language => language.name)
        setLanguages(languagesOfCountry)
        const flagAddressOfCountry = filteredList[0].flag
        setFlagAddress(flagAddressOfCountry)

        console.log(filteredList)
        setShow(filteredList)

        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${filteredList[0].capital}`)
          .then(response => {
            console.log(response.data)
            const temp = (response.data.current.temperature)
            setTemperature(temp)
            const wind = (response.data.current.wind_speed)
            setWind(wind)
            const windd = (response.data.current.wind_dir)
            setWindDir(windd)
            const wetherpicAddress = (response.data.current.weather_icons)
            setWeatherpicAddress(wetherpicAddress)

          })
      } else {
        setTooMany('Too many matches, specify another filter')
        setShow([])

      }
    } if (event.target.value.length === 0) {
      setFilter('')
      setShow([])
    }
  }



  return (
    <div >
      Find countries <input value={filter} onChange={handleChange} />
      <p>{tooMany}</p>
      <List show={show} handleClick={handleClick} />
      <Country show={show} 
        countryName={countryName} 
        capital={capital} 
        population={population} 
        languages={languages} 
        flagAddress={flagAddress} 
        temperature={temperature} 
        windspeed={wind}
        winddirection={windDir}
        weatherPic={wetherpicAddress}/>
    </div>
  );
}

export default App;
