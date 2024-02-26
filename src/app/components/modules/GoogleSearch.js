import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { queryAtom } from "@/app/store/atoms";

const GoogleSearch = () => {
  const [returnedData, setReturnedData] = useState(null);
  const query = useAtomValue(queryAtom);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://thirdeyes-backend.vercel.app/google?form-input=${query}`
        // `http://127.0.0.1:5328/google?form-input=${query}`
      );
      const data = await response.json();
      query !== null && setReturnedData(data);
    })();
  }, [query]);

  return (
    <>
      <div className="chat__sidebar__search">
        {returnedData &&
          returnedData.map((item) => {
            const url = new URL(item.link);
            const hostname = url.hostname.replace("www.", "");
            return (
              <ul key={item.title} className="search">
                <li className="search__result">
                  <a href={item.link} className="search__link">
                    {item.title.length > 50
                      ? item.title.substring(0, 50) + "..."
                      : item.title}
                    <p className="search__snippet">
                      {item.snippet.length > 50
                        ? item.snippet.substring(0, 50) + "..."
                        : item.snippet}
                    </p>
                    <p className="search__hostname">{hostname}</p>
                  </a>
                </li>
              </ul>
            );
          })}
      </div>
    </>
  );
};

export default GoogleSearch;
