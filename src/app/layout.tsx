// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

export const metadata = {
  title: 'Todo App',
  description: 'Tailwind + React Query 기반 투두 앱',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900">
        <QueryClientProvider client={queryClient}>
          <main className="max-w-xl mx-auto p-4">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  )
}
