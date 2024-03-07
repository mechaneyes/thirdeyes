"use client";

import Link from "next/link";

const ChatLogin = () => {
  return (
    <div className="chat__panel__inner chat__panel__inner--login">
      <div className="login-message">
        <h1>login to start a conversation</h1>
        <Link href="/api/auth/login">
          <button
            type="button"
            className="btn btn--outline-primary btn--login-logout"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatLogin;
