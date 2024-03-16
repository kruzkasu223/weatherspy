import classes from '../styles/WeatherCard.module.css'
import ArrowLeftIcon from '../assets/arrow-left.svg?react'
import FeelsLikeIcon from '../assets/feels-like.svg?react'
import HumidityIcon from '../assets/humidity.svg?react'
import LocationIcon from '../assets/location.svg?react'
import { ImageWithFallback } from '.'
import { WeatherData } from '../utils'
import { capitalCase } from 'change-case'

type P = {
  handleBack: () => void
  weatherData: WeatherData
}

export const WeatherCard = ({ handleBack, weatherData }: P) => {
  return (
    <main>
      <div className="title">
        <ArrowLeftIcon onClick={handleBack} /> Weather App
      </div>

      <div className={classes.weatherMainWrapper}>
        <ImageWithFallback
          width={200}
          height={200}
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
          fallbackSrc="/fallback.svg"
          alt={weatherData.description}
          title={weatherData.description}
          className={classes.weatherIcon}
        />
        <div className={classes.weatherTemperature}>
          <span>{weatherData.temperature}°</span>C
        </div>
        <div className={classes.weatherDescription}>
          {capitalCase(weatherData.description)}
        </div>
        <div className={classes.weatherCity}>
          <LocationIcon />
          {weatherData.city}, {weatherData.country}
        </div>
      </div>

      <div className={classes.weatherStatsWrapper}>
        <div className={classes.weatherStats}>
          <FeelsLikeIcon className={classes.weatherStatsIcon} />
          <div className={classes.weatherStatsTexts}>
            <div className={classes.weatherStatsTextNumber}>
              {weatherData.feelsLike}°C
            </div>
            <div className={classes.weatherStatsText}>Feels like</div>
          </div>
        </div>

        <div className={classes.weatherStats}>
          <HumidityIcon
            className={`${classes.weatherStatsIcon} ${classes.humidity}`}
          />
          <div className={classes.weatherStatsTexts}>
            <div className={classes.weatherStatsTextNumber}>
              {weatherData.humidity}%
            </div>
            <div className={classes.weatherStatsText}>Humidity</div>
          </div>
        </div>
      </div>
    </main>
  )
}
