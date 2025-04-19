import axios from 'axios'
import { Todo } from './types'

const API_URL = 'http://localhost:4000/todos' // json-server 기준

// 📥 전체 투두 목록 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(API_URL)
  return response.data
}

// ➕ 새로운 투두 생성
export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post<Todo>(API_URL, newTodo)
  return response.data
}

// ✏️ 기존 투두 수정
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/${todo.id}`, todo)
  return response.data
}

// ❌ 투두 삭제
export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}
