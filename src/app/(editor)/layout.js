"use client"

import { AuthProvider } from "@/app/lib/auth-context";

export default function EditorGroupLayout({ children }) {
  return (
    <AuthProvider>
      <section className="flex flex-auto justify-center mx-8">{children}</section>
    </AuthProvider>
  );
}
