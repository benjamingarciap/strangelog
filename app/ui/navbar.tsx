'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import // MagnifyingGlassIcon,
// MapPinIcon,
// Bars3Icon,
'@heroicons/react/24/outline'
import { useUserStore } from '../../stores/userStore'
import { SideMenuButton } from './SideMenuButton'

// Navbar component
export const Navbar = (): React.ReactElement => {
  const { data: session, status } = useSession()
  const user = useUserStore((state) => state.user)

  // ⏳ While session is being fetched → render nothing or a skeleton
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-4 w-full h-14 fixed top-0 z-10 bg-white border-b border-black">
        <SideMenuButton />
        <p className="font-extrabold text-lg">STRANGELOG</p>
        <div className="flex-1" />
        {/* <div className="animate-pulse w-20 h-6 bg-gray-200 rounded" /> */}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4 w-full h-14 fixed top-0 z-10  bg-white border-b border-black">
      {/* Left side */}
      <SideMenuButton />
      <div className="flex items-center gap-4">
        {/* <button>
          <Bars3Icon className="w-6 h-6" />
        </button> */}
        <Link href="/">
          {/* <MapPinIcon className="w-6 h-6" /> */}
          <p className=" font-extrabold text-lg">STRANGELOG</p>
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
      <div className="flex items-center gap-0">
        {session && user ? (
          <>
            <button className="h-[55px] px-5 cursor-pointer border-l-1 border-r-1 border-black max-h-full hover:bg-gray-200">
              Create
            </button>
            <Link
              href={`/users/${user.id}`}
              className="flex items-center h-[55px] px-5 cursor-pointer border-r border-black max-h-full hover:bg-gray-200"
            >
              Profile
            </Link>
            {/* <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Log Out
            </button> */}
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="flex items-center h-[55px] px-5 cursor-pointer border-l border-r border-black max-h-full hover:bg-gray-200"
            >
              Signin
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center h-[55px] px-5 cursor-pointer border-r border-black max-h-full hover:bg-gray-200"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
