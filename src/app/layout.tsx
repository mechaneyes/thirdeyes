import React from "react";
import type { Metadata } from "next";
import Provider from "@/app/_context/client-provider";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../../lib/apollo";
import { ApolloWrapper } from "../../lib/apollo-wrapper";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/styles.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thirdeyes",
  description: "Adventures in fine-tuning my third eye",
};

export default async function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any; // Replace 'any' with the actual type of your pageProps
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ApolloProvider client={apolloClient}> */}
          <ApolloWrapper>
            {/* <UserProvider>{children}</UserProvider> */}
            {children}
          </ApolloWrapper>
        {/* </ApolloProvider> */}
      </body>
    </html>
  );
}
