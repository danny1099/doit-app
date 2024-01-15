import styles from './styles.module.scss'

interface Props {
  name: string
  color?: string
  size?: string
}

export function Icon({ name, color, size = '1rem' }: Props) {
  return (
    <div className={styles.container} style={{ color }}>
      <svg className="bi" height={size} width={size}>
        <use xlinkHref={`/images/img-icons_sprite.svg#${name}`} />
      </svg>
    </div>
  )
}
