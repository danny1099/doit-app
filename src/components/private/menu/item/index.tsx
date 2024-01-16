import { Icon } from '@/components'
import Link from 'next/link'
import styles from './styles.module.scss'

interface Props {
  text: string
  to: string
  icon?: string
}

export const Item = ({ text, to, icon }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Link href={to}>
        {icon && <Icon name={icon} />}
        {text}
      </Link>
    </div>
  )
}
