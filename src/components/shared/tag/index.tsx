import styles from './styles.module.scss'

interface Props {
  text: string
  color?: string
}

export const Tag = ({ text }: Props) => {
  return <span className={`${styles.wrapper} bg-blue-50`}>{text}</span>
}
