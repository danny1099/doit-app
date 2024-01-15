import { globalFont } from '@/fonts'
import { ProvidersTree } from '@/providers'
import { builderMetadata } from '@/metadata'
import '@/globals.css'

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className={`${globalFont.className} antialiased`}>
        <ProvidersTree>{children}</ProvidersTree>
      </body>
    </html>
  )
}

export const metadata = builderMetadata.default
