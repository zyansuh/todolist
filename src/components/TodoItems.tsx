'use client'

import { Todo } from '@/features/todos/types'
import { useUpdateTodo, useDeleteTodo } from '@/features/todos/hooks'
import { motion } from 'framer-motion'
import { fadeIn } from '@/animations/fadeVariants'
import EditTodoModal from './EditTodoModal'
import useToggle from '@/hooks/useToggle'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()
  const [isEditing, toggleEdit] = useToggle()

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
    <>
      <motion.li
         variants={fadeIn}
         initial="hidden"
         animate="visible"
         exit="hidden"
         className="flex justify-between items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded p-3 mb-2 shadow"
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
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleEdit}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700"
          >
            삭제
          </button>
        </div>
      </motion.li>

      {isEditing && <EditTodoModal todo={todo} onClose={toggleEdit} />}
    </>
  )
}

export default TodoItem
