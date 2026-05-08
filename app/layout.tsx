import type { Metadata } from 'next'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  metadataBase: new URL('https://souvikns.github.io'),
  title: {
    default: 'Souvik De | Backend Developer',
    template: '%s | Souvik De',
  },
  description:
    'Portfolio of Souvik De, a backend developer building APIs, developer tools, GitHub automation, and AsyncAPI ecosystem tooling.',
  authors: [{ name: 'Souvik De' }],
  creator: 'Souvik De',
  openGraph: {
    title: 'Souvik De | Backend Developer',
    description:
      'Backend developer focused on APIs, developer tools, GitHub automation, and AsyncAPI ecosystem tooling.',
    url: 'https://souvikns.github.io',
    siteName: 'Souvik De',
    images: [
      {
        url: '/images/profile.jpg',
        width: 640,
        height: 640,
        alt: 'Souvik De',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Souvik De | Backend Developer',
    description:
      'Backend developer focused on APIs, developer tools, GitHub automation, and AsyncAPI ecosystem tooling.',
    images: ['/images/profile.jpg'],
    creator: '@buggs_lightyear',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
