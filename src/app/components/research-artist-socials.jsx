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
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Artist Social Media Links
        </h3>

        {reArtistSocials ? (
          <div className="">
            {reArtistSocials.map((result) => (
              <article key={result.link} className="pt-5 pb-2">
                <Link
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-darkslateblue-300 group"
                >
                  <div className="text-lg font-normal group-hover:text-researchlavender-300">
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
        ) : reArtistSocialsProg ? (
          <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
            <LoadingIndicator loadingCopy={`Generating lyrical analysis`} />
          </div>
        ) : (
          "Artist Socials not yet available."
        )}
      </div>
    </div>
  );
};

export default ResearchArtistSocials;
