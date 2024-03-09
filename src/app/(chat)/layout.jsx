"use client";

import { Grid } from "@carbon/react";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/sidebar";

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
