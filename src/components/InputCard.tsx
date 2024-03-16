import classes from '../styles/InputCard.module.css'

type P = {
  setCity: React.Dispatch<React.SetStateAction<string>>
  handleGetDeviceLocation: () => void
}

export const InputCard = ({ setCity, handleGetDeviceLocation }: P) => {
  return (
    <main>
      <h1 className="title">Weather App</h1>

      <div className={classes.inputWrapper}>
        <input
          type="text"
          name="city"
          // @ts-expect-error
          onKeyUp={(e) => e.key === 'Enter' && setCity(e?.target?.value || '')}
          placeholder="Enter city name"
          className={classes.cityInput}
        />

        <div className={classes.divider}>or</div>

        <button
          className={classes.getLocationButton}
          onClick={handleGetDeviceLocation}
        >
          Get Device Location
        </button>
      </div>
    </main>
  )
}
