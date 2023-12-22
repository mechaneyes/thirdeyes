import React from "react";
import type { Metadata } from "next";
// import Provider from "@/app/_context/client-provider";
// import { ApolloProvider } from "@apollo/client";
// import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "./globals.css";
import "./styles/styles.scss";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <UserProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
