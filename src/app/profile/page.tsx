'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div className="header">
        <Link href="/">
          <p className="logo">NextAuth.js</p>
        </Link>
        {session && (
          <Link href="#" onClick={() => signOut()} className="btn-signin">
            Sign out
          </Link>
        )}
        {!session && (
          <Link href="#" onClick={() => signIn()} className="btn-signin">
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
}