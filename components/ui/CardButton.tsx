import React from 'react'

interface CardButtonProps {
  children: React.ReactNode
  handleSubmit?: (id?: number) => Promise<void> | void
  id?: number
}

const CardButton: React.FC<CardButtonProps> = ({
  children,
  handleSubmit,
  id,
}) => {
  return (
    <button
      className="min-h-[24px] comments flex gap-1 bg-[#839eb3] hover:bg-[#495B68] px-2 pb-[2px] pt-[2px] justify-center items-center cursor-pointer rounded-lg transition-colors duration-400 text-white text-xs"
      onClick={(e) => {
        e.stopPropagation()
        if (id !== undefined && handleSubmit) {
          handleSubmit(id)
        } else if (handleSubmit) {
          handleSubmit()
        }
      }}
    >
      {children}
    </button>
  )
}

export default CardButton
