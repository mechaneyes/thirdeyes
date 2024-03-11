import { useState, useEffect, useRef } from "react";

export default function GDocsQuickstart() {
  // TODO(developer): Set to client ID and API key from the Developer Console
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

  const [isAuthorizeButtonVisible, setAuthorizeButtonVisible] = useState(true);
  const [isSignoutButtonVisible, setSignoutButtonVisible] = useState(false);

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
      setAuthorizeButtonVisible(true);
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
      document.getElementById("authorize_button").innerText = "Refresh";
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

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
      document.getElementById("content").innerText = "";
      document.getElementById("authorize_button").innerText = "Authorize";
      //   document.getElementById("signout_button").style.visibility = "hidden";
      setSignoutButtonVisible(false);
    }
  }

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
      document.getElementById("content").innerText = output;
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      return;
    }
  }

  useEffect(() => {
    // Callback after api.js is loaded.
    function gapiLoaded() {
      gapi.load("client", initializeGapiClient);
    }
    gapiLoaded();

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
    gisLoaded();
  }, []);

  return (
    <div>
      {isAuthorizeButtonVisible && (
        <button id="authorize_button" onClick={handleAuthClick}>
          Authorize
        </button>
      )}
      {isSignoutButtonVisible && (
        <button id="signout_button" onClick={handleSignoutClick}>
          Sign Out
        </button>
      )}
      <div id="content"></div>
    </div>
  );
}
