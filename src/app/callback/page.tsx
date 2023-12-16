"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function ClientSideRoot(): any {
  const { data: session } = useSession();

  const [shown, setShown] = useState<boolean>(false);
  const clickHandler = (): void => {
    setShown(!shown);
  };

  return (
    <div className="grid grid-rows-2 text-white p-4">
      <div>
        <h1 className="leading-loose text-accent">
          Hi {session && session.user ? session.user.name : "Guest"}!
        </h1>
      </div>
      <div>
        <p>client page</p>
        <button className="btn btn-primary" onClick={clickHandler}>
          Toggle
        </button>
        {shown ? <pre>{JSON.stringify(session, null, 2)}</pre> : null}
      </div>
    </div>
  );
}
