import { Topbar, Aside } from '@/components/private'
import styles from './styles.module.scss'

export default function Layout({ children }: Children) {
  return (
    <div className={styles.container}>
      <Topbar />

      <div className="flex flex-row h-full">
        <Aside />
        <main>{children}</main>
      </div>
    </div>
  )
}
