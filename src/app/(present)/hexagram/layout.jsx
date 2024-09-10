"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });

export default function EditorLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
2850;
