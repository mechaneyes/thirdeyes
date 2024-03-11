"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { isAuthorizedAtom } from "@/app/store/atoms";
import GoogleLogin from "@/app/components/google-login";
import Tiptap from "@/app/components/tiptap";
import { ButtonChatOptions } from "@/app/components/buttons/ButtonChatOptions";
import ModalEditor from "@/app/components/ModalEditor";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useAtom(isAuthorizedAtom);

  return (
    <>
      {/* <GoogleLogin /> */}
      {!isAuthorized && (
        <>
          <ButtonChatOptions
            onClick={() => setIsModalOpen(!isModalOpen)}
            classes={`btn btn--options btn--options--editor ${
              false ? "btn--disabled" : ""
            }`}
          />
          <ModalEditor
            classes={`modal modal--editor ${
              isModalOpen ? "modal--visible" : "modal--hidden"
            }`}
            onClick={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
}
