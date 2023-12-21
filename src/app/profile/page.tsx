"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

import { SignupButton } from "../_components/buttons/signup-button";
import { LoginButton } from "../_components/buttons/login-button";
import { LogoutButton } from "../_components/buttons/logout-button";

interface User {
  email: string;
  image: string;
}

const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasCreatedUser, setHasCreatedUser] = useState(false);
  const { user } = useUser();

  // get all users from db
  // 
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const usersData = await response.json();
      setUsers(usersData.users);
    };

    fetchUsers().catch((error) => console.error(error));
  }, []);

  // if loggedInUser.email is not in db, build
  // userToCreate object and create a new user
  //
  const checkUser = () => {
    if (user) {
      const loggedInUser: any = user;

      const userToCreate = {
        email: loggedInUser.email,
        image: loggedInUser.picture,
      };

      // const testUser = {
      //   email: "11@beep.beep"
      // }

      const userExists = users.find(
        (user) => user.email === loggedInUser.email
        // (user) => user.email === testUser.email
      );
      if (userExists) {
        console.log("userExists", userExists);
        return;
      }

      if (!userExists && !hasCreatedUser) {
        // console.log("userToCreate", userToCreate);
        createUser(userToCreate);
        setHasCreatedUser(true);
      }
    }
  };

  const createUser = async (userToCreate: {
    email: string;
    image?: string;
  }) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToCreate),
      });

      if (!response.ok) {
        throw new Error(`Oh Noe! HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("user created", data);

    } catch (error) {
      console.error("Oh Noe! An error occurred:", error);
    }
  };

  useEffect(() => {
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="nav-bar__buttons">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <LogoutButton />
          <Link href="/admin">+ Create</Link>
        </>
      )}
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user ? (
            <div className="flex items-center space-x-5">
              <LogoutButton />
              <img
                alt="profile"
                className="rounded-full w-12 h-12"
                src={user.picture ? user.picture : ""}
              />
            </div>
          ) : (
            <LoginButton />
          )}
        </nav>
        <Image
          src="/images/home--jorik-kleen.jpg"
          alt="ALTALTALTALTALTALTALT"
          width={1024}
          height={768}
          priority={true}
        />
      </div>
    </div>
  );
};

export default Profile;
