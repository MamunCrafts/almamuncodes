import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from './providers'

export const metadata: Metadata = {
  title: "Al Mamun Mim's Portfolio",
  description: "Md. Al Mamun Mim's portfolio showcasing skills in web development, software engineering, and design.",
  keywords: [
    'Md. Al Mamun Mim',
    'Mamun',
    'Web Developer',
    'Software Engineer',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'JavaScript Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Open Source Contributor',
    'Tech Enthusiast',
    'Portfolio',
    'Projects',
    'Web Design',
    'Web Development',
    'Software Development',
    'Programming',
    'Coding',
    'Tech Portfolio'
  ],
  authors: [{ name: 'Md. Al Mamun Mim', url: 'https://almamun.codes' }],
  creator: 'Md. Al Mamun Mim',
  generator: 'Next.js',
  applicationName: "Mamun's Lab",
  themeColor: '#ffffff',
  openGraph: {
    title: "Md. Al Mamun Mim – Full Stack Developer (3 yrs)",
    description: "Web portfolio of Md. Al Mamun Mim - Full Stack Developer & UI/UX Designer.",
    url: 'https://almamun.codes',
    siteName: "Mamun's Lab",
    images: [
      {
        url: '/og-image.png', // put in /public
        width: 1200,
        height: 630,
        alt: 'Mamun Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Md. Al Mamun Mim – Full Stack Developer (3 yrs)",
    description: "Web portfolio of Md. Al Mamun Mim - Full Stack Developer ,Tech Enthusiast. MERN Stack Developer.",
    creator: '@soft_eng_mamun',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>  <PostHogProvider>
         
          {children}
          
            </PostHogProvider></body>
    </html>
  )
}
