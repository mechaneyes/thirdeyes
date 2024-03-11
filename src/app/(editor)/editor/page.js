"use client";

import { useAtom } from "jotai";
import { isAuthorizedAtom } from "@/app/store/atoms";
import GoogleLogin from "@/app/components/google-login";
import Tiptap from "@/app/components/tiptap";
import { ButtonChatOptions } from "@/app/components/buttons/ButtonChatOptions";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom);

  //  Sign out from google upon button click.
  //
  function handleSignoutClick() {
    setIsAuthorized(false);
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
    }
  }
  
  return (
    <>
      {isAuthorized && (
        <>
          <div className="editor__inner"></div>
          <ButtonChatOptions
            classes={`btn btn--options btn--options--editor ${
              false ? "btn--disabled" : ""
            }`}
          />
          <button id="signout_button" onClick={handleSignoutClick}>
            Sign Out
          </button>
        </>
      )}
      <GoogleLogin />
      <Tiptap />
    </>
  );
}
