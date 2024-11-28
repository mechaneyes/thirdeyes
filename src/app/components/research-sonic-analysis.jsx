import { useAtom } from "jotai";

import {
  researchSonicAnalysisAtom,
  researchSonicAnalysisProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchSonicAnalysis = () => {
  const [reSonic] = useAtom(researchSonicAnalysisAtom);
  const [reSonicProg] = useAtom(researchSonicAnalysisProgressAtom);

  return (
    <div className="research-inner relative w-full h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="h-full">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Sonic Analysis
        </h3>

        <div className="text-base leading-6">
          {reSonic ? (
            reSonic
          ) : reSonicProg ? (
            <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
              <LoadingIndicator loadingCopy={`Generating sonic analysis`} />
            </div>
          ) : (
            "Sonic Analysis not yet available."
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchSonicAnalysis;
