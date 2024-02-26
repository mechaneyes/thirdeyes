import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { queryAtom } from "@/app/store/atoms";

const GoogleSearch = () => {
  const [returnedData, setReturnedData] = useState(null);
  const query = useAtomValue(queryAtom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // `https://thirdeyes-backend.vercel.app/google?form-input=${searchQuery}`
        `http://127.0.0.1:5328/google?form-input=${query}`
      );
      const data = await response.json();
      console.log("data", data);
      setReturnedData(data);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <div className="chat__sidebar__settings">
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(returnedData, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default GoogleSearch;
