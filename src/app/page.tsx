"use client";

import Image from "next/image";

export default function Chat() {
  return (
    <main className="home">
      <h1>Thirdeyes</h1>
      <div className="home__main__container">
        <section className="home__main">
          <div className="home__main__left">
            <h2>Future Echoes: Detroit</h2>
            <h3>An account of people who are lost in music</h3>
            <p>
              Detroit techno’s twin poles of mind-bending futurism and
              roof-raising melodicism come together in Octave One. The group is
              a family affair, with brothers Lenny and Lawrence Burden
              occasionally assisted by siblings Lynell, Lorne, and Lance.
            </p>
          </div>
          <div className="home__main__right home__main__image">
            <Image
              src="/images/home--jorik-kleen.jpg"
              alt="ALTALTALTALTALTALTALT"
              width={1024}
              height={768}
              priority={true}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
