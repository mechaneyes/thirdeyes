import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { queryAtom } from "@/app/store/atoms";

const GoogleSearch = ({ query, index }) => {
  const [returnedData, setReturnedData] = useState(null);
  //   const query = useAtomValue(queryAtom);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        // `https://thirdeyes-backend.vercel.app/google?form-input=${query}`
        `http://127.0.0.1:5328/google?form-input=${query}`
      );
      const data = await response.json();
      query !== null && setReturnedData(data);
      // console.log('data+query', data, query);
    })();
  }, [query]);

  return (
    <>
      <div className="module module--search">
        <ul className="module--search__list">
          {returnedData &&
            returnedData.map((item) => {
              const url = new URL(item.link);
              const hostname = url.hostname.replace("www.", "");
              return (
                <a
                  key={item.title}
                  href={item.link}
                  className="module--search__link"
                >
                  <li className="module--search__result">
                    <p className="module--search__title">
                      {item.title.length > 40
                        ? item.title.substring(0, 40) + "..."
                        : item.title}
                    </p>
                    <p className="module--search__snippet">
                      {item.snippet.length > 50
                        ? item.snippet.substring(0, 50) + "..."
                        : item.snippet}
                    </p>
                    <p className="module--search__hostname">{hostname}</p>
                  </li>
                </a>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default GoogleSearch;
