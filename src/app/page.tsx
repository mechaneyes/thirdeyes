import Header from "@/app/components/header";
import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";
import Writing from "@/app/components/writing";

export default function Home() {
  return (
    <div className="thirdeyes w-full flex flex-col items-center justify-center px-3 pb-4 overflow-hidden">
      <Header />
      <div className="third-body grid grid-rows-12 gap-3" style={{ height: 'calc(100vh - 87px)' }}>
        <div className="third-main w-full h-full relative row-span-8 flex flex-row items-center justify-center gap-3 max-w-7xl text-left text-4 text-darkslategray-100 font-mr-eaves-xl-san-ot">
          <Drafting />
          <Research />
        </div>
        <div className="third-write h-full row-span-4">
          <Writing />
        </div>
      </div>
    </div>
  );
}
