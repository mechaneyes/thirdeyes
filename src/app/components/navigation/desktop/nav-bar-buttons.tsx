"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { SignupButton } from "@/app/components/buttons/signup-button";
import { LoginButton } from "@/app/components/buttons/login-button";
import { LogoutButton } from "@/app/components/buttons/logout-button";

export const NavBarButtons = () => {
  const { user } = useUser();

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
        </>
      )}
    </div>
  );
};
