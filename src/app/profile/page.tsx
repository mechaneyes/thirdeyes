"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import { SignupButton } from "../_components/buttons/signup-button";
import { LoginButton } from "../_components/buttons/login-button";
import { LogoutButton } from "../_components/buttons/logout-button";

const Profile = () => {
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

export default Profile;
