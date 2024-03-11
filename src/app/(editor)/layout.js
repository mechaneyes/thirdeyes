"use client"

import { AuthProvider } from "@/app/lib/auth-context";

export default function EditorGroupLayout({ children }) {
  return (
    <AuthProvider>
      <section>{children}</section>
    </AuthProvider>
  );
}
