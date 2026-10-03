import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka } from 'next/font/google'
import './globals.css'
import SparkleCursor from '@/components/SparkleCursor'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LuckyRush — Play. Spin. Get Rewarded.',
  description: 'A premium social casino gaming lobby with daily rewards, jackpots, and new favorites every week.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/coin-favicon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/coin-favicon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fredoka.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${fredoka.variable} font-sans antialiased`}>
        <SparkleCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
