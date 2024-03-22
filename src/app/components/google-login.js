import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/app/lib/auth-context";
import { useAtom } from "jotai";
import { authTokenAtom, isAuthorizedAtom } from "@/app/store/atoms";

export default function GoogleLogin() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_DOCS_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DOCS_API_KEY;

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://docs.googleapis.com/$discovery/rest?version=v1";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

  let gapiInited = false;
  let gisInited = false;
  const tokenClientRef = useRef();
  const gisInitedRef = useRef(gisInited);

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [isSignoutButtonVisible, setSignoutButtonVisible] = useState(false);

  const { authInfo, setAuthInfo } = useAuth();

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  /**
   * Enables user interaction after all libraries are loaded.
   */
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClientRef.current.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setSignoutButtonVisible(true);

      // Store the token in context + state instead of localStorage or sessionStorage
      setAuthInfo({
        accessToken: resp.access_token,
      });
      setAuthToken({
        accessToken: resp.access_token,
      });
      await printDocTitle();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClientRef.current.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClientRef.current.requestAccessToken({ prompt: "" });
    }
  }

  // ————————————————————————————————————o moved —>
  // MOVED to /editor/page.js
  //
  // function handleSignoutClick() {}

  /**
   * Prints the title of a sample doc:
   * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
   */
  async function printDocTitle() {
    try {
      const response = await gapi.client.docs.documents.get({
        documentId: "195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE",
      });
      const doc = response.result;
      const output = `Document ${doc.title} successfully found.\n`;
      console.log("output", output);
    } catch (err) {
      console.log("err.message", err.message);
      return;
    }
  }

  useEffect(() => {
    // Callback after api.js is loaded.
    function gapiLoaded() {
      gapi.load("client", initializeGapiClient);
    }

    // Callback after Google Identity Services are loaded.
    function gisLoaded() {
      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
      });
      gisInitedRef.current = true;
      maybeEnableButtons();
    }

    setTimeout(() => {
      gapiLoaded();
      gisLoaded();
    }, 1000);
  }, []);

  return (
    !Object.keys(authToken).length > 0 && (
      <div className="editor__panel__inner editor__panel__inner--login">
        <>
          <div className="login-message">
            <h3>Authorize to Start Writing</h3>
            <button
              onClick={handleAuthClick}
              type="button"
              className="btn btn--outline-primary btn--login-logout"
            >
              Authorize
            </button>
          </div>
          <Image
            src="/images/hero--whirli-hero.png"
            alt="login"
            // fill={true}
            style={{ objectFit: "cover" }}
            width={800}
            height={800}
            className="login-image"
            priority={true}
          />
        </>
      </div>
    )
  );
}
