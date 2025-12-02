import React from 'react'

export default function CardTag({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    // <span className="flex items-center justify-center bg-[#E1E8EB] pb-[2px] px-1.5 pt-[2px] text-sm h-[21px]">
    // <span className="px-2 py-1 text-sm rounded-full text-gray-700 border border-gray-300">
    <span className="px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 h-[22px] flex items-center justify-center text-xs">
      {children}
    </span>
  )
}
