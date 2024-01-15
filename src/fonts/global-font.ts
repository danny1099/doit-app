import { Roboto, Inter } from 'next/font/google'

export const globalFont = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500'],
  fallback: ['system-ui', 'Poppins']
})

export const titleFont = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['Roboto']
})
