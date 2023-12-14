import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './styles/styles.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thirdeyes',
  description: 'Adventures in fine-tuning my third eye',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
