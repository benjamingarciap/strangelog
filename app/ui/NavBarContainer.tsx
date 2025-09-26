import React from 'react'
import { SideMenuButton } from './SideMenuButton'
import Link from 'next/link'
import Image from 'next/image'

type NavBarContainerProps = {
  children?: React.ReactNode | null
}

export default function NavBarContainer({
  children,
}: NavBarContainerProps): React.ReactElement {
  return (
    <nav className="fixed top-0 w-full h-[36px] z-10 bg-white">
      <div className="flex justify-center h-full">
        <div className="flex items-center gap-2 h-full w-full max-w-[calc(100%-40px)] border-b-[0.5px] border-black">
          <SideMenuButton />
          <Link href="/">
            <span className="flex items-center gap-1">
              <Image src="/logo-black.png" alt="Logo" width={29} height={29} />
              <p className="font-sans font-extrabold text-[20px] text-black">
                strangelog
              </p>
            </span>
          </Link>
          {children}
        </div>
      </div>
    </nav>
  )
}
