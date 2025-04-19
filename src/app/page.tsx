"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTodos } from "@/features/todos/hooks";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItems";
import TabButton from "@/components/TabButton";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

type FilterType = "all" | "completed" | "incomplete";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = (searchParams.get("filter") as FilterType) || "all";
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [search, setSearch] = useState("");

  useEffect(() => {
    router.replace(`/?filter=${filter}`);
  }, [filter, router]);

  const { data: todos, isLoading, isError } = useTodos();

  const filteredAndSortedTodos = todos
    ?.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    })
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다 🥲</p>;

  return (
    <div>
      {/* 🔘 다크모드 토글 */}
      <div className="mb-4 flex justify-end">
        <ToggleThemeButton />
      </div>

      <h1 className="mb-4 text-2xl font-bold dark:text-white">
        📝 나의 투두 리스트
      </h1>

      <Link
        href="/calendar"
        className="mb-2 inline-block text-sm text-blue-500 hover:underline"
      >
        📅 캘린더 보기
      </Link>

      {/* 🔍 검색창 */}
      <SearchInput value={search} onChange={setSearch} />

      {/* 🗂 필터 탭 */}
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

      {/* ➕ 입력 */}
      <TodoForm />

      {/* ✅ 투두 리스트 */}
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
