import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header = () => {
  const { user } = useUser();

  return (
    <header>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        {user ? (
          <div className="flex items-center space-x-5">
            <Link
              href="/api/auth/logout"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            href="/api/auth/login"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Login
          </Link>
        )}
      </nav>
      <Link href="/">
        <h1>Thirdeyes</h1>
      </Link>
    </header>
  );
};

export default Header;
