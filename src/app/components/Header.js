import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

import Modal from "@/app/components/Modal";
import { ButtonPrimary } from "@/app/components/buttons/ButtonPrimary";
import { ButtonHamburger } from "@/app/components/buttons/ButtonHamburger";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="header">
      <ButtonHamburger
        classes="btn--header__modal"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />

      <Link href="/">
        <h2>Thirdeyes</h2>
      </Link>

      <nav>
        {user ? (
          <>
            {user && (
              <ButtonPrimary
                link="/admin"
                name="Admin"
                classes="btn--login-logout"
              />
            )}
            <ButtonPrimary
              link="/api/auth/logout"
              name="Logout"
              classes="btn--login-logout"
            />
            <Image
              src={user.picture ? user.picture : ""}
              className="rounded-full w-12 h-12"
              alt="User Profile Picture"
              width={48}
              height={48}
            />
          </>
        ) : (
          <Link href="/api/auth/login">
            <button
              type="button"
              className="btn btn--outline-primary btn--login-logout"
            >
              Login
            </button>
          </Link>
        )}
      </nav>
      <Modal
        classes={`modal modal--chat ${
          isModalOpen ? "modal--visible" : "modal--hidden"
        }`}
        onClick={() => setIsModalOpen(false)}
      />
    </header>
  );
};

export default Header;
