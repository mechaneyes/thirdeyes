"use client";

import Image from "next/image";
import Link from "next/link";
import { Grid, Column } from "@carbon/react";

import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Grid className="thirdeyes home">
        <Column  lg={6} md={3} sm={4} className="home__main home__main--left">
          <h1>Future Echoes: Detroit</h1>
          <h3>An account of people who are lost in music</h3>
          <p>
            Thirdeyes produces first drafts of artist bios emulating a specific writer, &quot;phils&quot;, and a specific editorial style, &quot;hetfield&quot;.
          </p>
          <Link href="/chat">
            <button type="button" className="btn btn--outline-primary">
              Enter Chat
            </button>
          </Link>
        </Column>
        <Column
          lg={10}
          md={5}
          sm={4}
          className="home__main home__main--right"
        >
          <Image
            src="/images/home--jorik-kleen.jpg"
            alt="ALTALTALTALTALTALTALT"
            width={1024}
            height={768}
            priority={true}
          />
        </Column>
      </Grid>
    </>
  );
}
