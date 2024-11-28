import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { researchBioAtom } from "@/store/atoms";

const ResearchInfluences = () => {
  const [reBio] = useAtom(researchBioAtom);

  useEffect(() => {
    if (reBio) {
      const match = reBio.match(/Page: (.*?)\nSummary:/);
      if (match && match[1]) {
        setTitle(match[1]);
      }
    }
  }, [reBio]);

  return (
    <div className="research-inner relative h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="space-y-2">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Influences
        </h3>
        {formatText(reBio)}
      </div>
    </div>
  );
};

export default ResearchInfluences;
