"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const Chat = dynamic(() => import("@/app/components/chat"), { ssr: false });
const SidebarEditor = dynamic(() => import("@/app/components/sidebar-editor"), {
  ssr: false,
});
import SidebarSpotify from "@/app/components/spotify-module";

export default function EditorLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        <Grid className="thirdeyes chat editor">
          <Column
            max={3}
            xlg={3}
            lg={3}
            md={3}
            sm={4}
            className="editor__panel"
          >
            {children}
          </Column>
          <Column max={7} xlg={7} lg={7} md={7} sm={4} className="chat__panel">
            {/* <SidebarEditor /> */}
            <SidebarSpotify />
            <Chat />
          </Column>
          <Column
            max={6}
            xlg={6}
            lg={6}
            md={6}
            sm={4}
            className="editor__panel"
          >
            {children}
          </Column>
        </Grid>
      </main>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script async defer src="https://accounts.google.com/gsi/client"></script>
    </>
  );
}
