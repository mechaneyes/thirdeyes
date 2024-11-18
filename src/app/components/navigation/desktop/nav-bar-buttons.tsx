"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { SignupButton } from "@/app/components/ui/signup-button";
import { LoginButton } from "@/app/components/ui/login-button";
import { LogoutButton } from "@/app/components/ui/logout-button";

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
