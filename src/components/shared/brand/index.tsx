import { brandFont } from '@/fonts'
import styles from './styles.module.scss'

export const Brand = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="/images/img-logo-app.png"
        alt="Logo de Doit App"
        height={28}
        width={28}
      />
      <h1 className={brandFont.className}>doit</h1>
    </div>
  )
}
