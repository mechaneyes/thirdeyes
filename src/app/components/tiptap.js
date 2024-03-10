"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Paragraph } from "@tiptap/extension-paragraph";

import TiptapDiv from "./tiptap-div";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapDiv,
      Paragraph.configure({
        HTMLAttributes: {
          class: "tiptap__paragraph",
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "tiptap__heading",
        },
      }),
    ],
    content:
      `<p>Guttler, a very rich man too many avaricious, commonly he was travel at a horse, and single for to avoid all expenses. In the evening at to arrive at the inn did feign to be indispose, to the end that one bring him the supper. He did ordered to the stable knave to bring in their room some straw, for to put in their boots he made to warm her bed and was go lo sleep. When the servant was draw again, he come up again, and with the straw of their boots, and the candle Avhat was leave him he made a small fire where he was roast a herring what he did keep of her pocket. He was always the precaution one to provide him self of a small of bread and one bring up a water bottle, and thus with a little money.</p>` +
      `<p>Allow me, my dear abbot, who I remind me of your friendship. I recommend you M. of the Condamine. I shall tell you nothing, else he is a of my friends. Her great celebrity may tell you from others things, and her presence will say you the remains. My dear abbot, I will love you even the death.</p>` +
      `<p>A man one's was presented at a magistrate which had a considerable library. "What you make?" beg him the magistrate. "I do some books," he was answered. "But any of your books I did not seen its.—I believe it so, was answered the author; I mak nothing for Paris. From a of my works is imprinted, I send the edition for America; I don't compose what to colonies."</p>`,
    onCreate: ({ editor }) => {
      if (editor) {
        // Use the newly created command to wrap existing paragraphs in a div
        editor.commands.wrapInDiv();
      }
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
