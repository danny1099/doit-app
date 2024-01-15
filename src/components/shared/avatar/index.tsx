import { Fragment } from 'react'
import { Dot } from '@/components'
import styles from './styles.module.scss'

interface Props {
  size: 'sm' | 'md' | 'lg'
  alt?: string
  src?: string
  text?: string
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
}

export const Avatar = ({ src, alt, text, size = 'lg' }: Props) => {
  return (
    <Fragment>
      <span className={`${styles.wrapper} ${sizes[size]}`}>
        {src
          ? <img src={src} alt={alt ?? 'Avatar of user session'} />
          : <p>{text}</p>
        }
      </span>
      <Dot />
    </Fragment>
  )
}
