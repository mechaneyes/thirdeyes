"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Chat = dynamic(() => import("@/app/components/chat"), { ssr: false });
const Sidebar = dynamic(() => import("@/app/components/sidebar"), {
  ssr: false,
});

export default function ChatLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <Grid className="thirdeyes chat editor">
          <Column max={7} xlg={7} lg={7} md={7} sm={4} className="chat__panel">
            <Sidebar />
            <Chat />
          </Column>
          <Column
            max={9}
            xlg={9}
            lg={9}
            md={9}
            sm={4}
            className="editor__panel"
          >
            {children}
          </Column>
        </Grid>
      </main>
    </div>
  );
}
