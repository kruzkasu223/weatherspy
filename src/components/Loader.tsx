import classes from '../styles/Loader.module.css'

export const Loader = () => {
  return (
    <div className={classes.loaderWrapper}>
      <div className={classes.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
