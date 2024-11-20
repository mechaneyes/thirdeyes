"use client";

import React from 'react';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
const Header = dynamic(() => import('@/app/components/Header'), { ssr: false });

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
        throw new Error(`Oh Noe! HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log("user created", data);
    } catch (error) {
      console.error("Oh Noe! An error:", error);
    }
  };

  useEffect(() => {
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <main className="profile thirdeyes">
      <Header />
      <Image
        src="/images/home--jorik-kleen.jpg"
        alt="ALTALTALTALTALTALTALT"
        width={1024}
        height={768}
        priority={true}
      />
    </main>
  );
};

export default Profile;
