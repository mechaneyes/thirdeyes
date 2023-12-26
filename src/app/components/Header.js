import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header = () => {
  const { user } = useUser();

  return (
    <header>
      <div className="cds--col cds--col-sm-16 cds--col-md-16 cds--col-lg-16 cds--col-xlg-16 cds--col-max-16">
        <Link href="/">
          <h1>Thirdeyes</h1>
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              {user && (
                <Link href="/admin">
                  <button
                    type="button"
                    className="btn btn--outline-primary btn--login-logout"
                  >Create
                  </button>
                </Link>
              )}
              <Link href="/api/auth/logout">
                <button
                  type="button"
                  className="btn btn--outline-primary btn--login-logout"
                >
                  Logout
                </button>
              </Link>
              <Image
                src={user.picture ? user.picture : ""}
                className="rounded-full w-12 h-12"
                alt="User Profile Picture"
                width={48}
                height={48}
              />
            </div>
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
      </div>
    </header>
  );
};

export default Header;
