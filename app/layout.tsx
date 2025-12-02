'use client'
import './globals.css'
import { Navbar } from '@/components/ui/navbar/Navbar'
import React, { ReactElement, useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import SessionWrapper from '@/components/ui/SessionWrapper'
import { SideMenu } from '@/components/ui/sideMenu/SideMenu'
// import { SideMenu } from './ui/SideMenu'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): ReactElement {
  // Fetch user on mount
  const fetchUser = useUserStore((state) => state.fetchUser)
  const user = useUserStore((state) => state.user)
  const buttonRef = React.useRef<HTMLButtonElement>(
    null
  ) as React.RefObject<HTMLButtonElement>

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
          <Navbar buttonRef={buttonRef} />
          <SideMenu buttonRef={buttonRef} />
          <div className="flex w-full h-screen">
            {/* <SideMenu /> */}
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  )
}
