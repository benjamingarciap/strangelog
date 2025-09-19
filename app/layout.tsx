'use client'
import './ui/globals.css'
import { Navbar } from './ui/Navbar'
import React, { ReactElement, useEffect } from 'react'
import { useUserStore } from '../stores/userStore'
import SessionWrapper from './ui/SessionWrapper'
import { SideMenu } from './ui/SideMenu'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): ReactElement {
  // Fetch user on mount
  const fetchUser = useUserStore((state) => state.fetchUser)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  user
    ? console.log('layout render, user ID:', user.id)
    : console.log('layout render, no user')
  // ------------------------------
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-gray-100 min-h-screen">
        <SessionWrapper>
          <Navbar />
          <div className="flex w-full h-screen">
            <SideMenu />
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  )
}
