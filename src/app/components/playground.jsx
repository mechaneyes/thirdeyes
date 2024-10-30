import Image from "next/image";
import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";

const Playground = () => {
  return (
    <div className="w-full relative h-[51.125rem] grid grid-cols-2 items-center justify-center pt-[1rem] px-[0.5rem] pb-[0.5rem] box-border gap-[1rem] max-w-[80rem] text-left text-[1rem] text-darkslategray-100 font-mr-eaves-xl-san-ot">
      <Drafting />
      <Research />
    </div>
  );
};

export default Playground;
