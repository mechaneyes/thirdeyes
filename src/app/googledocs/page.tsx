"use client";

import dynamic from "next/dynamic";
const GDocsQuickstart = dynamic(() => import("@/app/components/gdocs-quickstart"), { ssr: false });

export default function IndexPage() {
  return <GDocsQuickstart />;
}
