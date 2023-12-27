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
            <li>Login</li>
            <li>Profile</li>
            <li>Saved Chats</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
