import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useSideMenuStore } from './../../stores/sideMenuStore'

export function SideMenu(): React.ReactElement {
  const { isOpen } = useSideMenuStore()
  const { data: session } = useSession()

  return (
    <div
      className={`h-full flex-shrink-0 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-0 '
      } border-r-1 border-black`}
    >
      <nav className="flex flex-col items-center justify-start max-h-full space-y-3 w-full mt-[55px]">
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={`
              ${
                isOpen ? 'flex' : 'hidden'
              } justify-center items-center h-[55px] px-5 cursor-pointer border-t-1 border-b-1 border-black max-h-full hover:bg-gray-200 w-full `}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  )
}
