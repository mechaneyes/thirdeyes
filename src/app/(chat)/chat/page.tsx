"use client";

import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/app/components/chat"), { ssr: false });

export default function IndexPage() {
  return <Chat />;
}
