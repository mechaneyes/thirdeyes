"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authTokenAtom } from "@/app/store/atoms";
import GoogleLogin from "@/app/components/google-login";
import Tiptap from "@/app/components/tiptap";
import { ButtonChatOptions } from "@/app/components/buttons/ButtonChatOptions";
import ModalEditor from "@/app/components/ModalEditor";

export default function EditorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);

  useEffect(() => {
    console.log("Object.keys(authToken)", Object.keys(authToken), authToken);
  });

  return (
    <>
      <GoogleLogin />
      <Tiptap />
      {Object.keys(authToken).length > 0 && (
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
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </>
      )}
    </>
  );
}
