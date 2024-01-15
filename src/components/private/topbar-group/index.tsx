import { Avatar, InputSearch, Icon } from '@/components/shared'
import styles from './styles.module.scss'

export const TopbarGroup = () => {
  return (
    <div className={styles.wrapper}>
      <InputSearch placeholder="Type keywords to search..." size="350px" />

      <span className="flex flex-row items-center gap-[15px]">
        <Icon name="bell" color="#585757" />
        <Icon name="gear" color="#585757" />
        <Avatar size="md" src="/images/img-avatar-example.jpg" />
      </span>
    </div>
  )
}
