"use client";

import { useEffect, useRef } from "react";
import { EditorContent } from "@tiptap/react";
import { Heading } from "@tiptap/extension-heading";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";

const Tiptap = ({ content, selector }) => {
  const elementRef = useRef();

  useEffect(() => {
    let editor;

    console.log("Running useEffect", { selector, content });

    if (selector) {
      elementRef.current = document.querySelector(selector);

      editor = new Editor({
        element: elementRef.current,
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
        content,
        autofocus: true,
        editable: true,
        injectCSS: false,
      });

      return () => {
        if (editor) {
          editor.destroy();
        }
      };
    }
  }, [selector, content]);

  // return <>{isAuthorized && <EditorContent />}</>;
};

export default Tiptap;
