import Header from "@/app/components/header";
import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";
import Writing from "@/app/components/writing";

export default function Create() {
  return (
    <>
      <Header />
      <div className="create-body grid grid-template-row-2 gap-4 pb-16">
        <div className="create-main w-full relative h-[50rem] flex flex-row items-center justify-center gap-4 max-w-7xl text-left text-4 text-darkslategray-100 font-mr-eaves-xl-san-ot">
          <Drafting />
          <Research />
        </div>
        <Writing />
      </div>
    </>
  );
}
