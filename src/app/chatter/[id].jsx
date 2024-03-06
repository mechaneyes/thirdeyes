// import { Metadata } from 'next'
// import { notFound, redirect } from 'next/navigation'

// import { auth } from '@/auth'
// import { getChat } from '@app/actions'
// import Chat from '@app/components/Chat'

// export async function generateMetadata({ params }) {
//   const session = await auth()

//   if (!session?.user) {
//     return {}
//   }

//   const chat = await getChat(params.id, session.user.id)
//   return {
//     title: chat?.title.toString().slice(0, 50) ?? 'Chat'
//   }
// }

// export default async function ChatPage({ params }) {
//   const session = await auth()

//   if (!session?.user) {
//     redirect(`/sign-in?next=/chat/${params.id}`)
//   }

//   const chat = await getChat(params.id, session.user.id)

//   if (!chat) {
//     notFound()
//   }

//   if (chat?.userId !== session?.user?.id) {
//     notFound()
//   }

//   return <Chat id={chat.id} />
// }

// "use client";

// import { useEffect, useState, useRef } from "react";
import { Grid, Column } from "@carbon/react";

import Layout from "@/app/components/layout";
import Header from "@/app/components/Header";
import ChatSaved from "../components/_chat-saved";
import ChatSettings from "../components/_chat-settings";
import Messages from "../components/_chat-messages";
import { getAllChatIds, getChatData } from "@/lib/chat";

export async function getStaticPaths() {
  const paths = getAllChatIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const chatData = getChatData(params.id);
  return {
    props: {
      chatData,
    },
  };
}

export default function Chat({ chatData }) {

  return <Layout>{chatData.title}</Layout>;

  // const [aspectRatio, setAspectRatio] = useState(1);
  // const [imageLoaded, setImageLoaded] = useState(false);
  // const [isHeightEqual, setIsHeightEqual] = useState(false);
  // const [settingsVisible, setSettingsVisible] = useState(true);

  // const chatMessagesRef = (useRef < HTMLElement) | (null > null);

  // useEffect(() => {
  //   // MutationObserver run when DOM changes are made
  //   const mutationObserver = new MutationObserver(() => {
  //     if (chatMessagesRef.current) {
  //       // Get all elements within chatMessagesRef.current
  //       // Convert the HTMLCollection to an array of HTMLDivElement
  //       const messages = Array.from(
  //         chatMessagesRef.current.getElementsByClassName(
  //           "chat__messages__message"
  //         )
  //       );

  //       // Calculate total height of messages
  //       const totalMessagesHeight = messages.reduce(
  //         (total, message) => total + message.offsetHeight,
  //         0
  //       );

  //       setIsHeightEqual(
  //         totalMessagesHeight > chatMessagesRef.current.offsetHeight - 76
  //       );
  //     }
  //   });

  //   // Start observing chatMessagesRef with the MutationObserver.
  //   // Observer will react to changes in the text content of
  //   // chatMessagesRef.current and its descendants
  //   //
  //   if (chatMessagesRef.current) {
  //     mutationObserver.observe(chatMessagesRef.current, {
  //       childList: true,
  //       subtree: true,
  //       characterData: true,
  //     });
  //   }

  //   // cleanup function stopping observing any changes
  //   return () => {
  //     mutationObserver.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setAspectRatio(window.innerWidth / window.innerHeight);
  //     setImageLoaded(true);
  //   };

  //   // Call once initially
  //   handleResize();

  //   // call every time window is resized
  //   window.addEventListener("resize", handleResize);

  //   // clean up event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  return (
    <>
      <Header />
      <Grid className="thirdeyes chat">
        {/* // ————————————————————————————————————o————————————————————————————————————o sidebar -->
            // ————————————————————————————————————o sidebar —>
        //  */}
        <Column max={6} xlg={6} lg={6} md={3} sm={4} className="chat__sidebar">
          <div
            className={`chat__sidebar__inner ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth < 672
                ? "chat__sidebar__inner--portrait"
                : ""
            } ${
              imageLoaded &&
              typeof window !== "undefined" &&
              window.innerWidth >= 672
                ? "chat__sidebar__inner--landscape"
                : ""
            }`}
          >
            {settingsVisible && <ChatSaved />}
          </div>
        </Column>

        {/* // ————————————————————————————————————o————————————————————————————————————o chat -->
            // ————————————————————————————————————o chat —>
        //  */}
        <Column max={10} xlg={10} lg={10} md={5} sm={4} className="chat__panel">
          <Messages
            chatMessagesRef={chatMessagesRef}
            isHeightEqual={isHeightEqual}
          />
        </Column>
      </Grid>
    </>
  );
}
