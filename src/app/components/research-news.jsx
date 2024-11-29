import { useAtom } from "jotai";

import { researchNewsAtom, researchNewsProgressAtom } from "@/store/atoms";
import LoadingIndicator from "./ui/loading-indicator";

const ResearchNews = () => {
  const [reNews] = useAtom(researchNewsAtom);
  const [reNewsProg] = useAtom(researchNewsProgressAtom);

  console.log('reNews', reNews);

  return (
    <div className="research-inner relative w-full h-full overflow-y-scroll pr-4 text-base text-darkslateblue-200 leading-5 whitespace-pre-wrap">
      <div className="h-full">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-normal">
          Recent News
        </h3>
        {reNews ? (
          <div className="space-y-6">
            {reNews.map((result) => (
              <article key={result.link} className="border-b pb-4">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 p-2 rounded"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {result.title}
                  </h2>
                  <p className="text-gray-600">{result.snippet}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {result.displayLink}
                  </p>
                </a>
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
