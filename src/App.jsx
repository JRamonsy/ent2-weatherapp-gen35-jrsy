import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './Components/WeatherCard'
import Loader from './Components/Loader'
import Error from './Components/Error'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const success = info => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude
    })
  }

  const unsuccessfully = () => {
    setError(true)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success, unsuccessfully)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIKEY = '3733052964da3af8d5ff792bdbf05c84'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = ((9 / 5 * celsius) + 32).toFixed(1)
          setTemp({
            celsius,
            fahrenheit
          })
        })
        .catch(err => {
          console.log(err)
          setError(true)
        })
        .finally(() => setIsLoading(false))
    }
  }, [coords])

  return (
    <div className='app'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : weather && !error ? (
        <WeatherCard weather={weather} temp={temp} />
      ) : null}
    </div>
  )
}

export default App
