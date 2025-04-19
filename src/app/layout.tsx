import "./styles/globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export const metadata = {
  title: "Todo App",
  description: "Tailwind + React Query 기반 투두 앱",
}; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-gray-100 text-gray-900">
        <QueryClientProvider client={queryClient}>
          <main className="mx-auto max-w-xl p-4">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
