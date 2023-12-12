"use client";

import Image from "next/image";
import { useChat } from "ai/react";
import { Upload } from "@carbon/icons-react";
import { useEffect, useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setAspectRatio(w / h);
    setImageLoaded(true);

    // console.log(aspectRatio);
  });

  return (
    <main className="chat">
      <section className="chat__hero">
        <h1>Thirdeyes</h1>
        <div
          className={`chat__hero__image ${
            imageLoaded && aspectRatio < 1.3
              ? "chat__hero__image--portrait"
              : ""
          } ${
            imageLoaded && aspectRatio > 1.3
              ? "chat__hero__image--landscape"
              : ""
          }`}
        >
          {aspectRatio < 1.3 ? (
            <Image
              src="/images/hero--steve-johnson-portrait.jpg"
              alt="Generative Illustration by Steve Johnson on Unsplash"
              width={720}
              height={1080}
              layout="responsive"
              priority={true}
            />
          ) : (
            <Image
              src="/images/hero--steve-johnson-landscape.jpg"
              alt="Generative Illustration by Steve Johnson on Unsplash"
              width={900}
              height={600}
              layout="responsive"
              priority={true}
            />
          )}
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
          <div className="chat__messages__anchor"></div>
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
