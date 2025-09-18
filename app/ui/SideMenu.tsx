import React from 'react'
import { signOut, useSession } from 'next-auth/react'

export function SideMenu(): React.ReactElement {
  const { data: session } = useSession()
  return (
    // <div className="col-span-1 max-h-full border-black mt-[55px]">
    <nav className="flex flex-col items-center justify-start max-h-full space-y-3 w-full mt-[55px]">
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="h-[55px] px-5 cursor-pointer border-t-1 border-b-1 border-black max-h-full hover:bg-gray-200 w-full"
        >
          Logout
        </button>
      )}
    </nav>
    // </div>
  )
}
