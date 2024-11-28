import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { researchInfluencesAtom } from "@/store/atoms";

const ResearchWelcome = () => {
  const [reInfluences] = useAtom(researchInfluencesAtom);

  return (
    <div className="research-inner relative h-full pr-4 text-base text-darkslateblue-200 leading-6 whitespace-pre-wrap">
      <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
        Research
      </h3>
      <p>
        Welcome to the research tool! You can use this tool to find information
        about artists, bands, or other topics.
      </p>
      <p>
        On first run the Wikipedia information associated with the artist
        you&apos;re working on is presented.
      </p>
      <p>
        Behind the scenes more information is being fetched about the artist. As
        it becomes available, that info can be accessed using the buttons below.
      </p>
      <p>More on the way.</p>
    </div>
  );
};

export default ResearchWelcome;
