import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import {
  researchInfluencesAtom,
  researchInfluencesProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchInfluences = () => {
  const [reInfluences] = useAtom(researchInfluencesAtom);
  const [reInfluencesProg] = useAtom(researchInfluencesProgressAtom);

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reInfluences ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <div className="h-full">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Influences
        </h3>
        {reInfluences ? (
          <div className="text-base leading-6">{reInfluences}</div>
        ) : reInfluencesProg ? (
          <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
            <LoadingIndicator loadingCopy={`Generating influences`} />
          </div>
        ) : (
          "Influences not yet available."
        )}
      </div>
    </div>
  );
};

export default ResearchInfluences;
