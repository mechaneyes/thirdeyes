"use client";

import dynamic from "next/dynamic";
import { Column, Grid } from "@carbon/react";

const Header = dynamic(() => import("@/app/components/Header"), { ssr: false });
const ChatEngineering = dynamic(
  () => import("@/app/components/chat-engineering"),
  { ssr: false }
);

export default function EditorLayout({ children }) {
  return (
    <>
      <main>
        <Header />
        <Grid className="thirdeyes chat editor engineering">
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={4}
            sm={2}
            className="engineering__panel"
          >
            <h3>Prompt Engineering Experimentation</h3>
            <p>
              We are experimenting with prompt engineering as it pertains to the
              reflection step within Thirdeyes. You will be experimenting with
              crafting the instructions for GPT-4o.
            </p>
            <ol>
              <li>
                Prompt our fine-tuned GPT-3.5 Turbo model using the form to the
                right. Simply enter an artist name and press &quot;Enter&quot;
                to submit
              </li>
              <li>Copy the output returned from the model</li>
              <li>
                Navigate to the{" "}
                <a href="https://platform.openai.com/playground/p/WOzy47bWKfq8N4GqK5qCuHHZ?model=undefined&mode=chat">
                  OpenAI Playground
                </a>
                . This link takes you to a pre-configured interface for
                experimenting with GPT-4o.
              </li>
              <li>
                Paste the output from our model which you&apos;ve copied into
                the form with the placeholder text &quot;Enter user
                message...&quot;
              </li>
              <li>
                Press &quot;Enter&quot; to submit the prompt. The model will
                generate a response based on the prompt you&apos;ve provided.
              </li>
            </ol>
            <p>
              The goal is to experiment with crafting the instructions for
              GPT-4o. The instructions should be clear and concise, and should
              guide the model to generate a response that is relevant to the
              prompt.
            </p>
            <p>
              The area you&apos;ll want to edit within the playground in the
              &quot;SYSTEM&quot; instructions area, and is highlighted with the
              phrase &quot;LEDE INSTRUCTIONS:&quot;
            </p>
          </Column>
          <Column
            max={8}
            xlg={8}
            lg={8}
            md={4}
            sm={2}
            className="editor__panel editor__panel--mvp"
          >
            <h3>Fine-Tuned GPT-3.5 Turbo</h3>
            <ChatEngineering />
          </Column>
        </Grid>
      </main>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script async defer src="https://accounts.google.com/gsi/client"></script>
    </>
  );
}
2850;
