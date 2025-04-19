import { useState } from 'react'

const useToggle = (initial = false): [boolean, () => void] => {
  const [open, setOpen] = useState(initial)
  const toggle = () => setOpen((prev) => !prev)
  return [open, toggle]
}

export default useToggle
