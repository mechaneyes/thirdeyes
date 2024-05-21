"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const ChatEvaluation = dynamic(() => import("@/app/components/chat"), { ssr: false });
const ChatReflection = dynamic(() => import("@/app/components/chat-reflection"), {
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
        <Grid className="thirdeyes chat editor reflection">
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={4}
            sm={2}
            className="editor__panel editor__panel--mvp"
          >
            {/* <SidebarEditor /> */}
            {/* <SpotifyModule /> */}
            <h3>Evaluation Models</h3>
            <ChatEvaluation />
          </Column>
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={4}
            sm={2}
            className="editor__panel editor__panel--mvp editor__panel--reflection"
          >
            <h3>Reflection</h3>
            <ChatReflection />
          </Column>
        </Grid>
      </main>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script async defer src="https://accounts.google.com/gsi/client"></script>
    </>
  );
}
2850