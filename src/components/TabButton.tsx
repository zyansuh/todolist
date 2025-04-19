'use client'

interface TabButtonProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

const TabButton = ({ selected, onClick, children }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors
        ${selected ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
    >
      {children}
    </button>
  )
}

export default TabButton
