import { Tag } from '@/components'
import styles from './styles.module.scss'

export const Aside = () => {
  return (
    <aside className={styles.wrapper}>
      <header>
        <Tag text="D" />
        <h6>DALE | Workspace</h6>
      </header>
    </aside>
  )
}
