import Drafting from "@/app/components/drafting";
import Research from "@/app/components/research";

export default function EditorHome() {
  return (
    <div className="w-full relative h-[51.125rem] flex flex-row items-center justify-center gap-4 max-w-[81.25rem] text-left text-[1rem] text-darkslategray-100 font-mr-eaves-xl-san-ot">
      <Drafting />
      <Research />
    </div>
  );
}
