"use client";

import dynamic from "next/dynamic";
import { Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Chat = dynamic(() => import("@/app/components/chat"), { ssr: false });

export default function ChatLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <Grid className="thirdeyes chat">
          <Chat />
          {children}
        </Grid>
      </main>
    </div>
  );
}
