'use client'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="할 일을 검색하세요..."
      className="w-full mb-4 px-4 py-2 border rounded shadow-sm dark:bg-gray-800 dark:text-white"
    />
  )
}

export default SearchInput
