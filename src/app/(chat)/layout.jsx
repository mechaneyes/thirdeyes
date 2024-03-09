"use client";

import dynamic from "next/dynamic";
import { Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Sidebar = dynamic(() => import("@/app/components/sidebar"), { ssr: false });

export default function ChatLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <Grid className="thirdeyes chat">
          <Sidebar />
          {children}
        </Grid>
      </main>
    </div>
  );
}
