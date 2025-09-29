'use client'
import React from 'react'
import { useSideMenuStore } from '../../stores/sideMenuStore'
import Image from 'next/image'

export function SideMenuButton(): React.ReactElement {
  const { isOpen, toggleMenu } = useSideMenuStore()
  return (
    <div className="">
      {/* Hamburger button */}
      <button
        onClick={() => {
          console.log('clicked', isOpen)
          toggleMenu()
        }}
        className="flex items-center h-[34px] py-1 cursor-pointer max-h-full transition-all duration-300 ease-in-out"
      >
        {isOpen ? (
          // <XMarkIcon width={24} height={24} />
          <Image
            src="/x.svg"
            alt="Menu"
            width={24}
            height={24}
            className="object-contain w-[60px] h-[60px]"
          />
        ) : (
          <>
            {/* <Bars2Icon width={24} height={24} /> */}
            <Image
              src="/hamburger-icon.svg"
              alt="Menu"
              width={24}
              height={24}
              className="object-contain w-[60px] h-[60px]"
            />
          </>
        )}
      </button>
    </div>
  )
}
