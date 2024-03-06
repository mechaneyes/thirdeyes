// import { type Metadata } from "next";
import { nanoid } from "@/lib/utils";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { createClient } from "@vercel/kv";
// import { getChat } from "@/app/actions";
import Chat from "@app/components/chat";

export const runtime = "edge";

// export interface ChatPageProps {
//   params: {
//     id: string;
//   };
// }

// export async function generateMetadata({ params }) {
//   // if (session) {
//   //   // const { user } = session;
//   //   // const key = `user_${user.email}`;
//   //   // const userDataString = await kv.get(key);
//   //   // const userData = JSON.parse(JSON.stringify(userDataString));
//   //   // console.log("userData", userData);
//   // } else {
//   //   // Handle the case where there is no session.
//   // }

//   return {chat_id: params.id}

//   // if (!session?.user) {
//   //   return {}
//   // }

//   // const chat = await getChat(params.id, session.user.id)
//   // return {
//   //   title: chat?.title.toString().slice(0, 50) ?? 'Chat'
//   // }
// }

export default async function ChatIdPage({params}) {
  const id = nanoid();

  const { user } = await getSession();
  // console.log("chatUser 🍄", params.id, user.email);

  return <Chat />;
}
