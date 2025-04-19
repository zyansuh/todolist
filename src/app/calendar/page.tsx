'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useTodos } from '@/features/todos/hooks'
import { format } from 'date-fns'

export default function CalendarPage() {
  const { data: todos, isLoading } = useTodos()

  const events =
    todos?.map((todo) => ({
      title: todo.title,
      date: todo.dueDate, // ISO 형식이어야 함 (ex: "2025-04-20")
      backgroundColor: todo.completed ? '#d1d5db' : '#3b82f6', // 회색 / 파랑
      borderColor: 'transparent',
    })) || []

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">📆 투두 캘린더</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      )}
    </div>
  )
}
