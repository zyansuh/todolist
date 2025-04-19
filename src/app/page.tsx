'use client'

import { useState } from 'react'
import { useTodos } from '@/features/todos/hooks'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItems'
import TabButton from '@/components/TabButton'
import { AnimatePresence } from 'framer-motion'

type FilterType = 'all' | 'completed' | 'incomplete'

export default function HomePage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const { data: todos, isLoading, isError } = useTodos()

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'incomplete') return !todo.completed
    return true
  })

  if (isLoading) return <p>로ading...</p>
  if (isError) return <p>에러가 발생했습니다 🥲</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📝 나의 투두 리스트</h1>

      {/* 🔹 필터 탭 */}
      <div className="flex gap-2 mb-4">
        <TabButton selected={filter === 'all'} onClick={() => setFilter('all')}>
          전체
        </TabButton>
        <TabButton selected={filter === 'completed'} onClick={() => setFilter('completed')}>
          완료
        </TabButton>
        <TabButton selected={filter === 'incomplete'} onClick={() => setFilter('incomplete')}>
          미완료
        </TabButton>
      </div>

      <TodoForm />

      {/* 🔸 리스트 */}
      <ul>
        <AnimatePresence>
          {filteredTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
