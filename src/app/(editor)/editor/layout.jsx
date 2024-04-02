"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Chat = dynamic(() => import("@/app/components/chat"), { ssr: false });
const ChatDouble = dynamic(() => import("@/app/components/chat-double"), {
  ssr: false,
});
const SidebarEditor = dynamic(() => import("@/app/components/sidebar-editor"), {
  ssr: false,
});
import SpotifyModule from "@/app/components/spotify-module";

export default function EditorLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        <Grid className="thirdeyes chat editor">
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={8}
            sm={4}
            className="editor__panel"
          >
            {/* <SidebarEditor /> */}
            {/* <SpotifyModule /> */}
            <Chat />
          </Column>
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={8}
            sm={4}
            className="editor__panel"
          >
            <ChatDouble />
          </Column>
        </Grid>
      </main>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script async defer src="https://accounts.google.com/gsi/client"></script>
    </>
  );
}
