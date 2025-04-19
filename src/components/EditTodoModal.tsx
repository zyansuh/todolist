'use client'

import { useState } from 'react'
import { Todo } from '@/features/todos/types'
import { useUpdateTodo } from '@/features/todos/hooks'
import { motion } from 'framer-motion'

interface EditTodoModalProps {
  todo: Todo
  onClose: () => void
}

const EditTodoModal = ({ todo, onClose }: EditTodoModalProps) => {
  const [title, setTitle] = useState(todo.title)
  const updateTodo = useUpdateTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateTodo.mutate({ ...todo, title })
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">할 일 수정</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded"
            placeholder="할 일을 수정하세요"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:underline"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditTodoModal
