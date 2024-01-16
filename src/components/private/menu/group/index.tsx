import { Item } from '@/components'
import styles from './styles.module.scss'

interface Props {
  options?: []
  title: string
}

export const Group = ({ title }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h5 style={{ padding: '0 1rem' }}>{title}</h5>

      <span>
        <Item text="My Clients" to="#" icon="person-lines-fill" />
        <Item text="Todo" to="#" icon="files" />
      </span>
    </div>
  )
}
