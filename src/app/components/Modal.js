import Link from "next/link";
import { Close } from "@carbon/icons-react";

export default function Modal({ classes, onClick }) {
  return (
    <div className={`modal ${classes}`}>
      <div className="modal__inner">
        <button className="modal__close">
          <Close onClick={onClick} size="32" className="modal__svg" />
        </button>
        <div className="modal__body">
          <ul>
            <li>
              <Link onClick={onClick} href="/">
                Logout
              </Link>
            </li>
            <li>
              <Link href="/">Saved Chats</Link>
            </li>
            <li>
              <Link href="/">Settings</Link>
            </li>
            <li>
              <Link href="/">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
