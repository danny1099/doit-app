import { Logo, Options } from '@/components'
import styles from './styles.module.scss'

export const Topbar = () => {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <Options />
    </header>
  )
}
