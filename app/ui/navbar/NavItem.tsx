'use client'
import React from 'react'
import Link from 'next/link'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import { Menu, X } from 'lucide-react'

type NavbarButtonProps = {
  isSideMenu: boolean
  isUser?: boolean
  href?: string
  children?: string | React.ReactElement
}

export function NavItem({
  isSideMenu,
  href,
  children,
}: NavbarButtonProps): React.ReactElement {
  const { isOpen, toggleMenu } = useSideMenuStore()
  if (isSideMenu)
    return (
      <button
        onClick={() => {
          console.log('clicked', isOpen)
          toggleMenu()
        }}
        className="flex items-center h-[36px] px-5 cursor-pointer  font-semibold border-r-1 border-black max-h-full hover:bg-gray-200 text-xs"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    )
  else
    return (
      <Link
        href={`${href}`}
        className="flex items-center h-[34px] px-3 py-1 cursor-pointer m-0 max-h-full hover:bg-gray-100 rounded-[6px] transition-colors duration-400 bg-white"
      >
        <p className="font-sans text-xs text-gray-700 font-semibold">
          {children}
        </p>
      </Link>
    )
}
