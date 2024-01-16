import { Item } from '@/components/private'
import styles from './styles.module.scss'

export const StaticOptions = () => {
  return (
    <div className={styles.wrapper}>
      <Item text="Home" to="#" icon="house" />
      <Item text="Profile" to="#" icon="person" />
      <Item text="Categorys" to="#" icon="tag" />
    </div>
  )
}
