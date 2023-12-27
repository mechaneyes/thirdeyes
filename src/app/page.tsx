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
        <Column max={6} xlg={6} lg={6} md={3} sm={2} className="home__main home__main--left">
          <h2>Future Echoes: Detroit</h2>
          <h3>An account of people who are lost in music</h3>
          <p>
            Detroit techno’s twin poles of mind-bending futurism and
            roof-raising melodicism come together in Octave One.
          </p>
          <Link href="/chat">
            <button type="button" className="btn btn--outline-primary">
              Enter Chat
            </button>
          </Link>
        </Column>
        <Column
          max={10}
          xlg={6}
          lg={6}
          md={3}
          sm={2}
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
