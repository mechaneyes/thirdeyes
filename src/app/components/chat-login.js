"use client";

import Link from "next/link";
import Image from "next/image";

const ChatLogin = () => {
  return (
    <div className="chat__panel__inner chat__panel__inner--login">
      <div className="login-message">
        <h3>login to start a conversation</h3>
        <Link href="/api/auth/login">
          <button
            type="button"
            className="btn btn--outline-primary btn--login-logout"
          >
            Login
          </button>
        </Link>
        <Image
          src="/images/hero--whirli-hero.png"
          alt="login"
          width={700}
          height={700}
          className="login-image"
        />
      </div>
    </div>
  );
};

export default ChatLogin;
