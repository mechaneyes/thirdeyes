import Header from "@/app/components/header";
import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";

export default function Create() {
  return (
    <>
      <Header />
      <div className="w-full relative h-[51.125rem] flex flex-row items-center justify-center gap-4 max-w-7xl text-left text-[1rem] text-darkslategray-100 font-mr-eaves-xl-san-ot">
        <Drafting />
        <Research />
      </div>
    </>
  );
}
