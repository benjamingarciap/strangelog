'use client'
import React from 'react'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import Image from 'next/image'

export function SideMenuButton({
  buttonRef,
}: {
  buttonRef: React.RefObject<HTMLButtonElement>
}): React.ReactElement {
  const { isOpen, toggleMenu } = useSideMenuStore()
  return (
    <div className="" id="side-menu-button">
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          toggleMenu()
          console.log('clicked', isOpen)
        }}
        className="flex items-center h-[34px] py-1 cursor-pointer max-h-full transition-all duration-300 ease-in-out"
      >
        {/* {isOpen ? (
          // <XMarkIcon width={24} height={24} />
          <Image
            src="/arrow-hamburger-1.svg"
            alt="Menu"
            width={24}
            height={24}
            className="object-contain w-[25px] h-[25px]"
          />
        ) : (
          <> */}
        {/* <Bars2Icon width={24} height={24} /> */}
        <Image
          src="/icons8-menu-30.svg"
          alt="Menu"
          width={19}
          height={19}
          className="object-contain w-[25px] h-[25px]"
        />
        {/* </>
        } */}
      </button>
    </div>
  )
}
