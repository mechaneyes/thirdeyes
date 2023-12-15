"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import { cn } from "../lib/utils";
import { Button, type ButtonProps } from "./button";
import { IconGitHub, IconSpinner } from "./icons";

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean;
  text?: string;
}

const LoginButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn("github", { callbackUrl: `/` });
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : "showGithubIcon" ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {"text"}
    </Button>
  );
}

export default LoginButton;
