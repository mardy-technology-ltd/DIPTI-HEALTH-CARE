import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | Dipti Marandi',
  description: 'Site administration dashboard',
  robots: 'noindex,nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
