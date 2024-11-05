"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/header"), { ssr: false });
const Sidebar = dynamic(() => import("@/app/components/sidebar"), {
  ssr: false,
});

export default function ChatLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <Grid className="thirdeyes chat">
          <Sidebar />
          <Column
            max={10}
            xlg={10}
            lg={10}
            md={5}
            sm={4}
            className="chat__panel"
          >
            {children}
          </Column>
        </Grid>
      </main>
    </div>
  );
}
