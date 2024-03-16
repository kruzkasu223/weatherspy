import { useState } from 'react'
import { InputCard, Loader, WeatherCard } from './components'
import './styles/App.css'
import { useLocationPermission, useWeather } from './utils'
import { Toaster } from 'react-hot-toast'

export const App = () => {
  const [city, setCity] = useState('')
  const {
    coordinates,
    isWaitingForPermission,
    handleGetDeviceLocation,
    clearCoordinates,
  } = useLocationPermission()
  const { loading, weatherData } = useWeather({ city, coordinates })

  const handleBack = () => {
    setCity('')
    clearCoordinates()
  }

  return (
    <>
      {(loading || isWaitingForPermission) && <Loader />}

      <Toaster position="top-right" />

      {weatherData ? (
        <WeatherCard handleBack={handleBack} weatherData={weatherData} />
      ) : (
        <InputCard
          setCity={setCity}
          handleGetDeviceLocation={handleGetDeviceLocation}
        />
      )}
    </>
  )
}
