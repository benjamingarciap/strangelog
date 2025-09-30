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
        className="flex items-center h-[36px] px-5 cursor-pointer border-r-1 border-black max-h-full hover:bg-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    )
  else
    return (
      <Link
        href={`${href}`}
        className="flex items-center h-[34px] px-5 py-1 cursor-pointer m-0 max-h-full hover:bg-gray-100"
      >
        <p className="font-sans text-[12px] font-medium">{children}</p>
      </Link>
    )
}
