"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/header"), { ssr: false });
const HowTo = dynamic(() => import("@/app/components/howto"), { ssr: false });

export default function EditorLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        <Grid className="thirdeyes chat editor">
          <Column
            max={5}
            xlg={5}
            lg={6}
            md={2}
            sm={1}
            className="editor__panel"
          >

            <Image
              src="/images/hero--whirli-hero.png"
              alt="background image. used character from whirligig font"
              style={{ objectFit: "cover" }}
              width={800}
              height={800}
              className="login-image"
              priority={true}
            />
          </Column>
          <Column
            max={11}
            xlg={11}
            lg={10}
            md={6}
            sm={3}
            className="editor__panel editor__panel--howto"
          >
            <HowTo />
          </Column>
        </Grid>
      </main>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script async defer src="https://accounts.google.com/gsi/client"></script>
    </>
  );
}
