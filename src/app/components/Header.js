import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

import { ButtonPrimary } from "@app/components/buttons/ButtonPrimary";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="header">
      <Link href="/">
        <h1>Thirdeyes</h1>
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
    </header>
  );
};

export default Header;
