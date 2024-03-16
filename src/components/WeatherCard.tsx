import classes from '../styles/WeatherCard.module.css'
import ArrowLeftIcon from '../assets/arrow-left.svg?react'
import FeelsLikeIcon from '../assets/feels-like.svg?react'
import HumidityIcon from '../assets/humidity.svg?react'
import LocationIcon from '../assets/location.svg?react'
import { ImageWithFallback } from '.'

type P = {
  setCity: React.Dispatch<React.SetStateAction<string>>
}

export const WeatherCard = ({ setCity }: P) => {
  return (
    <main>
      <div className="title">
        <ArrowLeftIcon onClick={() => setCity('')} /> Weather App
      </div>

      <div className={classes.weatherMainWrapper}>
        <ImageWithFallback
          width={200}
          height={200}
          src="https://openweathermap.org/img/wn/10d@4x.png"
          fallbackSrc="/fallback.svg"
          alt=""
          className={classes.weatherIcon}
        />
        <div className={classes.weatherTemperature}>
          <span>13°</span>C
        </div>
        <div className={classes.weatherDescription}>Broken Clouds</div>
        <div className={classes.weatherCity}>
          <LocationIcon />
          Kathmandu, Nepal
        </div>
      </div>

      <div className={classes.weatherStatsWrapper}>
        <div className={classes.weatherStats}>
          <FeelsLikeIcon className={classes.weatherStatsIcon} />
          <div className={classes.weatherStatsTexts}>
            <div className={classes.weatherStatsTextNumber}>17°C</div>
            <div className={classes.weatherStatsText}>Feels like</div>
          </div>
        </div>

        <div className={classes.weatherStats}>
          <HumidityIcon
            className={`${classes.weatherStatsIcon} ${classes.humidity}`}
          />
          <div className={classes.weatherStatsTexts}>
            <div className={classes.weatherStatsTextNumber}>84%</div>
            <div className={classes.weatherStatsText}>Humidity</div>
          </div>
        </div>
      </div>
    </main>
  )
}
