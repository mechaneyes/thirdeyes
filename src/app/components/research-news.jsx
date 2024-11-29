import Link from 'next/link';
import { useAtom } from "jotai";

import { researchNewsAtom, researchNewsProgressAtom } from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchNews = () => {
  const [reNews] = useAtom(researchNewsAtom);
  const [reNewsProg] = useAtom(researchNewsProgressAtom);

  return (
    <div className="research-inner relative w-full h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="h-full">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Recent News
        </h3>
        {reNews ? (
          <div className="">
            {reNews.map((result) => (
              <article key={result.link} className="pt-5">
                <Link
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-darkslateblue-300 group"
                >
                  <div className="text-lg font-normal group-hover:text-researchlavender-300">{result.title}</div>

                  <div className="text-sm font-normal group-hover:text-researchlavender-300 mt-1">
                    {result.displayLink}
                  </div>

                  <p className="mt-2">{result.snippet}</p>
                </Link>
              </article>
            ))}
          </div>
        ) : reNewsProg ? (
          <div className="w-full h-[calc(100%-30px)] flex flex-col items-center justify-center">
            <LoadingIndicator loadingCopy={`Generating Recent News`} />
          </div>
        ) : (
          "Recent News not yet available."
        )}
      </div>
    </div>
  );
};

export default ResearchNews;
