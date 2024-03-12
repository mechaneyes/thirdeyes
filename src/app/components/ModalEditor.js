import Link from "next/link";
import { Close } from "@carbon/icons-react";
import { useAtom } from "jotai";
import { authTokenAtom } from "@/app/store/atoms";

export default function ModalEditor({ classes, onClick }) {
    const [authToken, setAuthToken] = useAtom(authTokenAtom);

  //  Sign out from google upon button click.
  //
  function handleSignoutClick() {
    setAuthToken([]);
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken("");
    }
  }
  
  return (
    <div className={`modal modal--editor ${classes}`}>
      <div className="modal__inner">
        <button className="modal__close">
          <Close onClick={onClick} size="32" className="modal__svg" />
        </button>
        <div className="modal__body">
          <ul>
            <li>
              <Link onClick={onClick} href="/">
                New Document
              </Link>
            </li>
            <li>
              <Link href="/">Saved Documents</Link>
            </li>
            <li>
              <Link href="/">Settings</Link>
            </li>
            <li onClick={handleSignoutClick}>Sign Out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
