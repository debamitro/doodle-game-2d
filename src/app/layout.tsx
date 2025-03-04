import type { Metadata } from 'next'
import { Inter, Fredoka, Comic_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Link from 'next/link'
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
        <nav className="absolute top-0 right-0 p-4 flex gap-3">
          <Link href="/" className="font-fredoka text-purple-600 hover:text-purple-800 transition-colors">
            Home
          </Link>
          <Link href="/about" className="font-fredoka text-purple-600 hover:text-purple-800 transition-colors">
            About
          </Link>
        </nav>
        {children}
        <footer className="bottom-0 w-full p-4 text-center font-fredoka text-purple-600">
          &copy; 2025 Built with ❤️ at <a href="https://sundai.club" target="_blank" rel="noopener noreferrer">SundAI</a>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
