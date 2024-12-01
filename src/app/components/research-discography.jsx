import { useAtom } from "jotai";

import {
  researchDiscographyAtom,
  researchDiscographyProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchDiscography = () => {
  const [reDiscography] = useAtom(researchDiscographyAtom);
  const [reDiscographyProg] = useAtom(researchDiscographyProgressAtom);

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reDiscography ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <div className="h-full">
        {reDiscography ? (
          <>
            <h3 className="pb-1 text-2xl text-darkslateblue-300 font-normal">
              Discography
            </h3>
            <div className="pt-4 leading-6">
              {reDiscography.map((release, index) => (
                <div key={index} className="pb-8">
                  <div className="font-normal text-xl">{release.title}</div>
                  <div className="text-base font-base">
                    {release.date} • {release.format}
                  </div>
                  <div className="text-base font-normal pt-2">Tracks</div>
                  {release.tracks.map((track, index) => (
                    <div key={index}>
                      {track.number}. {track.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          reDiscographyProg && (
            <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
              <LoadingIndicator loadingCopy={`Generating Discography`} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResearchDiscography;
