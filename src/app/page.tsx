import Head from 'next/head';
import Header from "@/app/components/Header";
import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";
import Writing from "@/app/components/writing";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://p.typekit.net"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://use.typekit.net/xgg6bof.css" />
      </Head>
      <div className="thirdeyes w-full flex flex-col items-center justify-center px-3 pb-4 bg-sky-100 overflow-hidden">
        <Header />
        <div
          className="third-body w-full grid grid-rows-12 gap-3"
          style={{ height: "calc(100vh - 87px)" }}
        >
          <div className="third-main w-full h-full relative row-span-8 flex flex-row items-center justify-center gap-3 max-w-7xl text-left text-4 text-darkslategray-100 font-mr-eaves-xl-san-ot">
            <Drafting />
            <Research />
          </div>
          <div className="third-write h-full row-span-4">
            <Writing />
          </div>
        </div>
      </div>
    </>
  );
}
