"use client"

import { AuthProvider } from "@/app/lib/auth-context";

export default function EditorGroupLayout({ children }) {
  return (
    <AuthProvider>
      <section className="flex flex-col justify-center items-center gap-4 max-w-7xl mx-auto">{children}</section>
    </AuthProvider>
  );
}
