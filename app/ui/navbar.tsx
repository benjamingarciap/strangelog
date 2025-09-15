'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import {
  // MagnifyingGlassIcon,
  // MapPinIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { useUserStore } from '../../stores/userStore'

// Navbar component
export const Navbar = (): React.ReactElement => {
  const { data: session } = useSession()
  const user = useUserStore((state) => state.user)
  return (
    <div className="flex items-center gap-4 p-4 w-full h-14 fixed top-0 z-10 shadow-md bg-white">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <Link href="/">
          {/* <MapPinIcon className="w-6 h-6" /> */}
          STRANGELOG
        </Link>
      </div>
      {/* Center input */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2 min-w-[120px]">
          {/* <input
            name="search"
            type="text"
            className="border border-gray-300 rounded-md p-2 h-6 pl-8 w-full"
            placeholder="Search..."
          />
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> */}
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-2">
        {session && user ? (
          <>
            <button>Create</button>
            <Link href={`/users/${user.id}`}>Profile</Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin">Signin</Link>
            <Link href="/auth/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  )
}
