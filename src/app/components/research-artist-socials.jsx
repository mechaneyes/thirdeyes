import Link from "next/link";
import { useAtom } from "jotai";

import {
  researchArtistSocialsAtom,
  researchArtistSocialsProgressAtom,
} from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchArtistSocials = () => {
  const [reArtistSocials] = useAtom(researchArtistSocialsAtom);
  const [reArtistSocialsProg] = useAtom(researchArtistSocialsProgressAtom);

  return (
    <div
      className={`research-inner relative w-full h-full ${
        reArtistSocials ? "overflow-y-scroll" : ""
      } pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap`}
    >
      <div className="h-full">
        {reArtistSocials ? (
          <>
            <div className="">
              {reArtistSocials.map((result) => (
                <article key={result.link} className="pt-4 pb-2">
                  <Link
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-darkslateblue-300 group"
                  >
                    <div className="text-xl font-normal group-hover:text-researchlavender-300">
                      {result.title}
                    </div>

                    <div className="text-normal font-light group-hover:text-researchlavender-300 mt-1">
                      {result.displayLink}
                    </div>

                    {/* <p className="mt-2">{result.snippet}</p> */}
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          reArtistSocialsProg && (
            <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
              <LoadingIndicator loadingCopy={`Generating lyrical analysis`} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResearchArtistSocials;
