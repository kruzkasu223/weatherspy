import { useState } from 'react'
import { InputCard, WeatherCard } from './components'
import './styles/App.css'

export const App = () => {
  const [city, setCity] = useState('sdsdsd')
  return city ? (
    <WeatherCard setCity={setCity} />
  ) : (
    <InputCard setCity={setCity} />
  )
}
