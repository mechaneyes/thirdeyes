import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { theUserAtom } from "@/app/store/atoms";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createClient } from "@vercel/kv";

// import { ChatHistory } from './chat-history'
import Modal from "@/app/components/Modal";
import { ButtonPrimary } from "@/app/components/buttons/ButtonPrimary";
import { ButtonHamburger } from "@/app/components/buttons/ButtonHamburger";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [theUser, setTheUser] = useAtom(theUserAtom);

  // user && console.log("auth0 user", user);
  // console.log('theUser', theUser)

  const kv = createClient({
    url: process.env.NEXT_PUBLIC_KV_REST_API_URL,
    token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN,
  });

  // ————————————————————————————————————o————————————————————————————————————o get/set users -->
  //
  // ————————————————————————————————————o set users —>
  //
  async function setUser(user) {
    if (!user) return;

    const key = `user_${user.email}`;
    const userObject = {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      chats: [],
    };

    await kv.set(key, JSON.stringify(userObject), { nx: true });
  }

  // ————————————————————————————————————o get users —>
  //
  async function getUser() {
    const key = `user_${user.email}`;
    const userDataString = await kv.get(key);

    let userData;
    try {
      userData = JSON.parse(JSON.stringify(userDataString));
    } catch (error) {
      console.error("Invalid JSON:", userDataString);
    }

    if (userData) {
      // Check if any of the properties in userObject are not present
      const missingItems = ["name", "nickname", "email", "chats"].filter(
        (item) => !(item in userData)
      );

      if (missingItems.length > 0) {
        // If any items are missing, add them
        userData = missingItems.reduce((acc, item) => {
          acc[item] = user[item] || [];
          return acc;
        }, userData);

        // Save the updated userData back to the key-value store
        await setUser(user);
      }
    } else {
      console.log("User not found");
      setUser(user);
    }

    // console.log(`Key: ${key}`, userData);
  }

  useEffect(() => {
    if (user) {
      setTheUser(user);

      getUser().catch(console.error);

      // ————————————————————————————————————o deleting users —>
      //
      // async function deleteUser(email) {
      //   const key = `user_${email}`;
      //   await kv.del(key);
      // }
      // deleteUser('ray@mechaneyes.com').catch(console.error);
    }
  }, [user]);

  return (
    <header className="header">
      <ButtonHamburger
        classes="btn--header__modal"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />

      <Link href="/">
        <h2>Thirdeyes</h2>
      </Link>

      {/* {user ?? <ChatHistory userId={user.id} />} */}

      <nav>
        {user ? (
          <>
            {user && (
              <>
                <ButtonPrimary
                  link="/chat"
                  name="Chat"
                  classes="btn--login-logout"
                />
                <ButtonPrimary
                  link="/editor"
                  name="Editor"
                  classes="btn--login-logout"
                />
              </>
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
