import './ui/globals.css'
import { Navbar } from './ui/navbar'
import React from 'react'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.ReactElement> {
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-gray-100 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
