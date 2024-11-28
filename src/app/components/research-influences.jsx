import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { researchInfluencesAtom } from "@/store/atoms";

const ResearchInfluences = () => {
  const [reInfluences] = useAtom(researchInfluencesAtom);

  return (
    <div className="research-inner relative w-full h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="space-y-2">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Influences
        </h3>
        {reInfluences ? (
          reInfluences
        ) : (
          <>
            <div>Influences not yet available.</div>
            <div>Check back later.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResearchInfluences;
