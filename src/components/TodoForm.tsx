'use client'

import { useState } from 'react'
import { useCreateTodo } from '@/features/todos/hooks'

const TodoForm = () => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('') // ✅ 날짜 상태 추가
  const createTodoMutation = useCreateTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    createTodoMutation.mutate({
      title: trimmed,
      completed: false,
      dueDate: dueDate || undefined, // 날짜 선택 안 했으면 undefined
    })

    setTitle('')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="border px-3 py-2 rounded shadow-sm"
      />

      {/* 📅 날짜 입력 */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border px-3 py-2 rounded shadow-sm"
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
