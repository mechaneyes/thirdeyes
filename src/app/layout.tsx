import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
// import Provider from "@/app/_context/client-provider";
// import { ApolloProvider } from "@apollo/client";
// import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import "./styles/styles.scss";

export const metadata: Metadata = {
  title: "Thirdeyes",
  description: "Adventures in fine-tuning my third eye",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
