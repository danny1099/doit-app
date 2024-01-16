import styles from './styles.module.scss'

export const Navigate = ({ children }: Children) => {
  return <nav className={styles.wrapper}>{children}</nav>
}
