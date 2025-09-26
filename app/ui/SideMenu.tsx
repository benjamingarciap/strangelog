import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useSideMenuStore } from './../../stores/sideMenuStore'

type MenuButton = {
  name: string
  href: string
}

const buttons: MenuButton[] = [{ name: 'Logout', href: '/' }]

export function SideMenu(): React.ReactElement {
  const { isOpen } = useSideMenuStore()
  const { data: session } = useSession()

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white z-[2] transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden`}
    >
      <nav className="flex flex-col items-center justify-start max-h-full space-y-3 w-full mt-[55px]">
        {session &&
          buttons.map((button, key) => {
            return (
              <button
                key={key}
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`
             flex justify-center items-center h-[55px] px-5 cursor-pointer max-h-full hover:bg-gray-200 w-full `}
              >
                {button.name}
              </button>
            )
          })}
      </nav>
    </div>
  )
}
