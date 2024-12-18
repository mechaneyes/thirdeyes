import { useAtom } from "jotai";

import {
  researchDiscourseAtom,
  researchDiscourseProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchDiscourse = () => {
  const [reDiscourse] = useAtom(researchDiscourseAtom);
  const [reDiscourseProg] = useAtom(researchDiscourseProgressAtom);

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reDiscourse ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <div className="h-full">
        {reDiscourse ? (
          <div className="text-base leading-6">{reDiscourse}</div>
        ) : (
          reDiscourseProg && (
            <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
              <LoadingIndicator loadingCopy={`Retrieving Discourse`} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResearchDiscourse;
