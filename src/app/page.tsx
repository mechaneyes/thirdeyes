"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Grid, Column } from "@carbon/react";
import { useUser } from "@auth0/nextjs-auth0/client";
// import Chat from '@/app/components/chat'
const Header = dynamic(() => import("./components/Header"), { ssr: false });
import { ButtonPrimary } from "@/app/components/buttons/ButtonPrimary";

// import Header from "./components/Header";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Header />
      <Grid className="thirdeyes home">
        <Column lg={6} md={3} sm={4} className="home__main home__main--left">
          <h1>Future Echoes</h1>
          <h3>An account of people who are lost in music</h3>
          <p>
            Thirdeyes produces first drafts of artist bios emulating the
            editorial style of &quot;hetfield&quot;.
          </p>
          <div className="home__ctas">
            {user ? (
              <>
                {user && (
                  <>
                    {/* <ButtonPrimary
                      link="/chat"
                      name="Chat"
                      classes="btn--login-logout"
                      onClick={() => {
                        console.log("Button clicked");
                      }}
                    /> */}
                    <ButtonPrimary
                      link="/editor"
                      name="Chat"
                      classes="btn--login-logout"
                      onClick={() => {}}
                    />
                    <ButtonPrimary
                      link="/howto"
                      name="How To"
                      classes="btn--login-logout"
                      onClick={() => {}}
                    />
                  </>
                )}
                {/* <ButtonPrimary
                  link="/api/auth/logout"
                  name="Logout"
                  classes="btn--login-logout"
                  onClick={() => {
                    console.log("Button clicked");
                  }}
                /> */}
              </>
            ) : (
              // <Link href="/api/auth/login">
              //   <button type="button" className="btn btn--outline-primary">
              //     Login
              //   </button>
              // </Link>
              <ButtonPrimary
                link="/editor"
                name="Chat"
                classes="btn--login-logout"
                onClick={() => {}}
              />
            )}
          </div>
        </Column>
        <Column lg={10} md={5} sm={4} className="home__main home__main--right">
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
