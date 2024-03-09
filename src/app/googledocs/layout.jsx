"use client";

import dynamic from "next/dynamic";
import { Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });

export default function ChatLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        <Grid className="thirdeyes chat">{children}</Grid>
      </main>
      <script
        async
        defer
        src="https://apis.google.com/js/api.js"
        onload="gapiLoaded()"
      ></script>
      <script
        async
        defer
        src="https://accounts.google.com/gsi/client"
        onload="gisLoaded()"
      ></script>
    </div>
  );
}
