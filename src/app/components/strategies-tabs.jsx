import { useAtom } from "jotai";

import { strategiesLoadingAtom } from "@/store/atoms";

const TabsDrafting = ({ activeTab, onTabChange }) => {
  const [strategiesLoading, setStrategiesLoading] = useAtom(
    strategiesLoadingAtom
  );

  return (
    <div
      className={`self-stretch rounded-t-lg rounded-b-none bg-lightgray border-seagreen border-y border-solid flex flex-row items-center justify-start text-white font-bold cursor-pointer`}
    >
      <div
        onClick={() => onTabChange("lede")}
        className={`${
          strategiesLoading ? "pointer-events-none" : ""
        } h-8 flex-1 flex flex-row items-center justify-center border-seagreen border-r border-solid rounded-tl-lg ${
          activeTab === "lede"
            ? "bg-mediumseagreen-400"
            : "bg-mediumseagreen-300"
        }`}
      >
        Lede
      </div>
      <div
        onClick={() => onTabChange("origin")}
        className={`${
          strategiesLoading ? "pointer-events-none" : ""
        } h-8 flex-1 flex flex-row items-center justify-center border-seagreen border-solid border-r ${
          activeTab === "origin"
            ? "bg-mediumseagreen-400"
            : "bg-mediumseagreen-300"
        }`}
      >
        Origin
      </div>
      <div
        onClick={() => onTabChange("works")}
        className={`${
          strategiesLoading ? "pointer-events-none" : ""
        } h-8 flex-1 flex flex-row items-center justify-center border-seagreen border-solid rounded-tr-lg ${
          activeTab === "works"
            ? "bg-mediumseagreen-400"
            : "bg-mediumseagreen-300"
        }`}
      >
        Works
      </div>
    </div>
  );
};

export default TabsDrafting;
