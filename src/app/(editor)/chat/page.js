"use client";

import { useRef, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authTokenAtom } from "@/app/store/atoms";
import GoogleLogin from "@/app/components/google-login";
import Tiptap from "@/app/components/tiptap";
import { ButtonChatOptions } from "@/app/components/ui/ButtonChatOptions";
import ModalEditor from "@/app/components/ModalEditor";

import { guttler, guttlerClipped } from "@/app/store/tiptap-content";

export default function EditorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipTapComponent, setTipTapComponent] = useState(null);
  const [authToken, setAuthToken] = useAtom(authTokenAtom);

  const editorRef = useRef();

  useEffect(() => {
    if (Object.keys(authToken).length > 0) {
      setTipTapComponent(<Tiptap content={guttler} selector=".editor__inner" />);
    }
  }, [authToken]);

  return (
    <>
      <GoogleLogin />

      <div className="editor__inner" ref={editorRef}></div>
      {tipTapComponent}

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
