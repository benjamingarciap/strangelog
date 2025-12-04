import React from 'react'
import { SideMenuButton } from '../sideMenu/SideMenuButton'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type NavBarContainerProps = {
  children?: React.ReactNode | null
}

export default function NavBarContainer({
  children,
  buttonRef,
}: NavBarContainerProps & {
  buttonRef: React.RefObject<HTMLButtonElement>
}): React.ReactElement {
  const pathname = usePathname()
  console.log('Current pathname:', pathname)

  return (
    <nav className="fixed top-0 w-full h-[44px] z-10 bg-white">
      <div className="flex justify-center h-full">
        <div className="flex items-center justify-between gap-2 h-full w-full max-w-[calc(100%-40px)] border-b-[0.5px] border-gray-300">
          {/* <div className="flex items-center justify-between gap-2 h-full w-full max-w-[calc(100%-40px)]"> */}
          <div className="flex items-center gap-4">
            <div className="min-w-[38px]">
              {pathname === '/' && <SideMenuButton buttonRef={buttonRef} />}
            </div>
            <Link href="/">
              <span className="flex items-center gap-1">
                {/* <Image
                  src="/logo-black.png"
                  alt="Logo"
                  width={29}
                  height={29}
                  className="w-7 h-auto text-gray-100"
                /> */}
                <p
                  // style={{
                  //   fontFamily: 'Techovier, monospace',
                  //   color: '#1e2939',
                  //   fontWeight: 800,
                  //   fontSize: '19px',
                  //   fontStyle: 'bold',
                  // }}
                  className="font-sans font-extrabold text-[22px] text-gray-800"
                >
                  <Image
                    src="/strangelog2.svg"
                    alt="Logo"
                    width={150}
                    height={150}
                  />
                </p>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </nav>
  )
}
