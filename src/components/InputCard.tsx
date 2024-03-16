import classes from '../styles/InputCard.module.css'

export const InputCard = () => {
  return (
    <main>
      <h1 className="title">Weather App</h1>

      <div className={classes.inputWrapper}>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city name"
          className={classes.cityInput}
        />

        <div className={classes.divider}>or</div>

        <button className={classes.getLocationButton}>
          Get Device Location
        </button>
      </div>
    </main>
  )
}
