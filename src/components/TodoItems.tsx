'use client'

import { Todo } from '@/features/todos/types'
import { useUpdateTodo, useDeleteTodo } from '@/features/todos/hooks'
import { motion } from 'framer-motion'
import { fadeIn } from '@/animations/fadeVariants'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const handleToggle = () => {
    updateTodo.mutate({
      ...todo,
      completed: !todo.completed,
    })
  }

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteTodo.mutate(todo.id)
    }
  }

  return (
    <motion.li
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex justify-between items-center bg-white rounded p-3 mb-2 shadow"
    >
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-4 h-4"
        />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.title}
        </span>
      </label>
      <button
        onClick={handleDelete}
        className="text-sm text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </motion.li>
  )
}

export default TodoItem
