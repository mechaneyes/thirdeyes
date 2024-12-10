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
      <div className="h-auto">
        {reLyrical ? (
          <div className="text-base leading-6">{reLyrical}</div>
        ) : (
          reLyricalProg && (
            <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
              <LoadingIndicator loadingCopy={`Generating Lyrical Analysis`} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResearchLyricalAnalysis;
