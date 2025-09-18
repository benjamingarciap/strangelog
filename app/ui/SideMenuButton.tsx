'use client'
import React from 'react'
import { Menu, X } from 'lucide-react' // icons
import { useSideMenuStore } from '../../stores/sideMenuStore'

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
        // className="p-2 focus:outline-none cursor-pointer"
        className="flex items-center h-[55px] px-5 cursor-pointer border-l-1 border-r-1 border-black max-h-full hover:bg-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {/* {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 mt-[56px] focus:ring-0 focus:outline-none cursor-pointer"
        />
      )} */}

      {/* Sidebar */}
      {/* <div
        className={`fixed top-[56px] left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>
        <nav className="p-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            About
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Services
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-500">
            Contact
          </a>
        </nav>
      </div> */}
    </div>
  )
}
