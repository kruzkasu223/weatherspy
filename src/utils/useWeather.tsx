import { useEffect, useState } from 'react'
import {
  Coordinates,
  DASH,
  OPEN_WEATHER_MAP_API_KEY,
  OPEN_WEATHER_MAP_BASE_API_URL,
  fetcher,
} from '.'
import toast from 'react-hot-toast'

type P = {
  city?: string
  coordinates?: Coordinates
}

export type WeatherData = {
  icon: string
  temperature: number | string
  description: string
  city: string
  country: string
  feelsLike: number | string
  humidity: number | string
}

export type WeatherDataResponse = {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

type Clouds = {
  all: number
}

type Coord = {
  lon: number
  lat: number
}

type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

type Sys = {
  country: string
  sunrise: number
  sunset: number
}

type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type Wind = {
  speed: number
  deg: number
  gust: number
}

export type CityDataResponse = {
  name: string
  local_names: Record<string, string>
  lat: number
  lon: number
  country: string
  state: string
}

export const useWeather = ({ city, coordinates }: P) => {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!city && (!coordinates?.latitude || !coordinates.longitude))
      return setWeatherData(undefined)
    ;(async () => {
      setLoading(true)
      let cityData: CityDataResponse | undefined = undefined

      if (city) {
        const data = await fetcher<CityDataResponse[]>(
          OPEN_WEATHER_MAP_BASE_API_URL +
            `geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_MAP_API_KEY}`
        )
        if (data.length && data?.[0]) {
          cityData = data?.[0]
        } else {
          setLoading(false)
          toast.error('No city found!')
          return
        }
      }

      fetcher<WeatherDataResponse>(
        OPEN_WEATHER_MAP_BASE_API_URL +
          `/data/2.5/weather?units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}&lat=${
            cityData?.lat || coordinates?.latitude
          }&lon=${cityData?.lon || coordinates?.longitude}`
      )
        .then((data) => {
          setWeatherData({
            city: data.name || DASH,
            country: data.sys.country || DASH,
            description:
              data.weather?.[0]?.description || data.weather?.[0]?.main || DASH,
            feelsLike: data.main.feels_like || data.main.temp || DASH,
            humidity: data.main.humidity || DASH,
            icon: data.weather?.[0]?.icon || DASH,
            temperature: data.main.temp || DASH,
          })
        })
        .catch((error) => {
          toast.error(
            error.message || 'Something went wrong while fetching weather!!!'
          )
        })
        .finally(() => setLoading(false))
    })()
  }, [city, coordinates])

  return { weatherData, loading }
}
