"use client";

import Image from "next/image";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="chat">
      <section className="chat__hero">
        <h1>Thirdeyes</h1>
        <div className="chat__hero__image">
          <Image
            src="/images/hero--steve-johnson-unsplash.jpg"
            alt="Generative Illustration by Steve Johnson on Unsplash"
            width={828}
            height={552}
          />
        </div>
      </section>
      <section className="chat__panel">
        <div className="chat__messages">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat__messages__message ${
                m.role === "user"
                  ? "chat__messages__message--user "
                  : "chat__messages__message--ai"
              }`}
            >
              {/* {m.role === "user" ? "User: " : "AI: "} */}
              {m.content}
            </div>
          ))}
        </div>

        <div className="chat__form">
          <form className="chat__form__form" onSubmit={handleSubmit}>
            <label>
              <input
                className="chat__form__input"
                value={input}
                onChange={handleInputChange}
              />
              <button type="submit">
                <Upload size={24} className="chat__form__send-icon" />
              </button>
            </label>
          </form>
        </div>
      </section>
    </main>
  );
}
