import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Dipti Marandi | Senior Staff Nurse',
  description: 'Dipti Marandi - Dedicated to Healthcare',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#f8fbff] text-slate-800 min-h-screen font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
