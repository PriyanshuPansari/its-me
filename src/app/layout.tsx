import type { Metadata } from 'next'
//import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name - Personal Website',
  description: 'Personal website and blog',
}

//const geistSans = Geist({
//  variable: '--font-geist-sans',
//  subsets: ['latin'],
//})
//
//const geistMono = Geist_Mono({
//  variable: '--font-geist-mono',
//  subsets: ['latin'],
//})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
