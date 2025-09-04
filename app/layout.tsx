import './ui/globals.css'
import { Navbar } from './ui/navbar'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-gray-100 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
