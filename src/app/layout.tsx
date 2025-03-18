import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TypeScript Professional Course',
  description: 'Aprende TypeScript desde cero hasta nivel experto',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 