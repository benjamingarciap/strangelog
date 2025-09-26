'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '../../stores/userStore'
import { NavItem } from './NavItem'
import NavBarContainer from './NavBarContainer'

// Navbar component
export const Navbar = (): React.ReactElement => {
  const { data: session, status } = useSession()
  const user = useUserStore((state) => state.user)

  // ⏳ While session is being fetched → render nothing or a skeleton
  if (status === 'loading') {
    return <NavBarContainer />
  }
  return (
    <NavBarContainer>
      {/* Right side */}
      <div className="flex items-center gap-0">
        {session && user ? (
          <>
            <NavItem isSideMenu={false} href={'/'}>
              + Create
            </NavItem>
            <NavItem isSideMenu={false} href={`/users/${user.id}`}>
              Profile
            </NavItem>
          </>
        ) : (
          <>
            <NavItem isSideMenu={false} href={`/auth/signin`}>
              Signin
            </NavItem>
            <NavItem isSideMenu={false} href={`/auth/signup`}>
              Signup
            </NavItem>
          </>
        )}
      </div>
    </NavBarContainer>
  )
}
