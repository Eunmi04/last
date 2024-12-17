import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/Providers'
import Footer from '@/components/Footer' // Footer 컴포넌트 임포트

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'WEB',
  description: 'Create, Read, Update, and Delete in MongoDB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          {/* 폭정렬 */}
          <div className="flex flex-col min-h-screen">
            <div className="max-w-4xl mx-auto pt-16 flex-grow">
              <Navbar />
              <div className="mt-8">{children}</div>
            </div>
            <Footer /> {/* 푸터 추가 */}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
