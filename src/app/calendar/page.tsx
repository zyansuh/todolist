'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useTodos } from '@/features/todos/hooks'
import EditTodoModal from '@/components/EditTodoModal'
import { Todo } from '@/features/todos/types'
import { EventClickArg } from '@fullcalendar/core'

export default function CalendarPage() {
  const { data: todos, isLoading } = useTodos()
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const handleEventClick = (info:EventClickArg ) => {
    const todoId = info.event.id
    const foundTodo = todos?.find((t) => t.id === todoId)
    if (foundTodo) setSelectedTodo(foundTodo)
  }

  const events =
    todos?.map((todo) => ({
      id: todo.id,
      title: todo.title,
      date: todo.dueDate,
      backgroundColor: todo.completed ? '#9ca3af' : '#3b82f6',
      textColor: '#fff',
      borderColor: 'transparent',
    })) || []

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">📅 투두 캘린더</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            eventClick={handleEventClick} // ✅ 클릭 핸들러 추가
          />

          {/* ✏️ 수정 모달 */}
          {selectedTodo && (
            <EditTodoModal
              todo={selectedTodo}
              onClose={() => setSelectedTodo(null)}
            />
          )}
        </>
      )}
    </div>
  )
}
