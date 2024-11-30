import { useAtom } from "jotai";

import {
  researchLyricalAnalysisAtom,
  researchLyricalAnalysisProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchLyricalAnalysis = () => {
  const [reLyrical] = useAtom(researchLyricalAnalysisAtom);
  const [reLyricalProg] = useAtom(researchLyricalAnalysisProgressAtom);

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reLyrical ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <div className="h-full">
        <h3 className="pb-1 text-2xl text-darkslateblue-300 font-normal">
          Lyrical Analysis
        </h3>

        {reLyrical ? (
          <div className="text-base leading-6">{reLyrical}</div>
        ) : reLyricalProg ? (
          <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
            <LoadingIndicator loadingCopy={`Generating lyrical analysis`} />
          </div>
        ) : (
          "Lyrical Analysis not yet available."
        )}
      </div>
    </div>
  );
};

export default ResearchLyricalAnalysis;
