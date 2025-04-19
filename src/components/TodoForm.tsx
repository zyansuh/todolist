'use client'

import { useState } from 'react'
import { useCreateTodo } from '@/features/todos/hooks'

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const createTodoMutation = useCreateTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    createTodoMutation.mutate({
      title: trimmed,
      completed: false,
    })

    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1 border rounded px-3 py-2 shadow-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </form>
  )
}

export default TodoForm
