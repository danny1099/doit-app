import { Tag, Navigate, StaticOptions, Group } from '@/components'
import styles from './styles.module.scss'

export const Aside = () => {
  return (
    <aside className={styles.wrapper}>
      <header>
        <Tag text="D" />
        <h5>Danny | Workspace</h5>
      </header>

      <Navigate>
        <StaticOptions />
        <Group title="Favorites" />
        <Group title="Workspaces" />
      </Navigate>
    </aside>
  )
}
