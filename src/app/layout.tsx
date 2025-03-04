import type { Metadata } from 'next'
import { Inter, Fredoka, Comic_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
})

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comic",
})
export const metadata: Metadata = {
  title: 'Doodle Game 2d',
  description: 'Play a 2-d game with your own character',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${comicNeue.variable} ${fredoka.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
