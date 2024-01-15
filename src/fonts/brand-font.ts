import { Comfortaa } from 'next/font/google'

export const brandFont = Comfortaa({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  fallback: ['system-ui', 'Poppins']
})
