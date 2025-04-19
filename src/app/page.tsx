"use client";

import { useState } from "react";
import { useTodos } from "@/features/todos/hooks";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItems";
import TabButton from "@/components/TabButton";
import { AnimatePresence } from "framer-motion";
import ToggleThemeButton from "@/components/ToggleThemeButton";

type FilterType = "all" | "completed" | "incomplete";

export default function HomePage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { data: todos, isLoading, isError } = useTodos();

  const filteredAndSortedTodos = todos
    ?.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    })
    .sort((a, b) => Number(a.completed) - Number(b.completed));
  // 미완료(false) → 완료(true) 순서

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다 🥲</p>;

  return (
    <div>
      <ToggleThemeButton />
      <h1 className="mb-4 text-2xl font-bold dark:text-white">
        📝 나의 투두 리스트
      </h1>

      <div className="mb-4 flex gap-2">
        <TabButton selected={filter === "all"} onClick={() => setFilter("all")}>
          전체
        </TabButton>
        <TabButton
          selected={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          완료
        </TabButton>
        <TabButton
          selected={filter === "incomplete"}
          onClick={() => setFilter("incomplete")}
        >
          미완료
        </TabButton>
      </div>

      <TodoForm />

      <ul>
        <AnimatePresence>
          {filteredAndSortedTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
