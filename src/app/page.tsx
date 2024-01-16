import { privateRoutes } from '@/routes'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Doit | Home</h1>
      <Link href={privateRoutes.Workspace('xy1i4ohll')}>Workspace</Link>
      <Link href={privateRoutes.Profile}>Profile</Link>
    </main>
  )
}
