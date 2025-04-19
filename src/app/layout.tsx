import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Todo App',
  description: 'My Next.js Todo App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
