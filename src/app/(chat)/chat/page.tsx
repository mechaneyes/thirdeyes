"use client"

import dynamic from "next/dynamic";
// import Chat from '@/app/components/chat'
const Chat = dynamic(() => import('@/app/components/chat'), { ssr: false });


export default function IndexPage() {
  return <Chat />
}
