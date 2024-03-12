"use client";

import { useEffect, useRef } from 'react';
import { EditorContent } from "@tiptap/react";
import { Heading } from "@tiptap/extension-heading";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";

import { guttlerClipped } from "@/app/store/tiptap-content";

const Tiptap = ({ selector }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (selector) {
      editorRef.current = document.querySelector(selector);

      new Editor({
        element: editorRef.current,
        extensions: [
          Document,
          Heading.configure({
            HTMLAttributes: {
              class: "tiptap__heading",
            },
          }),
          Paragraph.configure({
            HTMLAttributes: {
              class: "tiptap__paragraph",
            },
          }),
          Text,
        ],
        content: guttlerClipped,
        autofocus: true,
        editable: true,
        injectCSS: false,
      });

      return;
    }
  }, [selector]);

  // return <>{isAuthorized && <EditorContent />}</>;
};

export default Tiptap;
