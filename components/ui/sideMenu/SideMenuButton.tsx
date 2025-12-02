'use client'
import React from 'react'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import MenuIcon from '@/icons/icons8-menu-30.svg'

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
        className="flex justify-center items-center h-[34px] pt-1 pb-0.5 pl-2 pr-2 cursor-pointer max-h-full transition-all duration-300 ease-in-out hover:bg-gray-200 rounded"
      >
        <MenuIcon className="w-[22px] h-[25px] fill-gray-600 pb-0.5" />
      </button>
    </div>
  )
}
