import type { Metadata } from 'next'
import './globals.css'
import { NetflixProvider } from '@/contexts/NetflixContext'
import { ProfileProvider } from '@/contexts/ProfileContext'

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix clone built with Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NetflixProvider>
          <ProfileProvider>
            {children}
          </ProfileProvider>
        </NetflixProvider>
      </body>
    </html>
  )
}