import styles from './styles.module.scss'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <img
        src="/images/img-logo-app.png"
        alt="Logo de Doit Task"
        height={28}
        width={28}
      />
    </div>
  )
}
