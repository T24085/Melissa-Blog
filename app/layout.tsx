import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Melissa's Musings - Faith, Life & Everything In Between",
  description: 'A thoughtful blog exploring faith, life experiences, and the journey of discovery. Join Melissa as she shares insights, stories, and reflections.',
  keywords: 'blog, faith, religion, life, reflection, spiritual journey, christian, personal growth',
  authors: [{ name: 'Melissa' }],
  openGraph: {
    title: "Melissa's Musings",
    description: 'A thoughtful blog exploring faith, life experiences, and the journey of discovery.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}


