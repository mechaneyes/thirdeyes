"use client";

import { useAtom } from "jotai";
import { authorizationVisibleAtom } from "@/app/store/atoms";
import GoogleLogin from "@/app/components/google-login";
import Tiptap from "@/app/components/tiptap";

export default function Home() {
  return (
    <>
      <GoogleLogin />
      <Tiptap />
    </>
  );
}
