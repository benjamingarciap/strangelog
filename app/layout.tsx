import './ui/globals.css'
import { Navbar } from './ui/navbar'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
    </html>
  )
}
