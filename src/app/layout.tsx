import React from "react";
import Head from "next/head";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import "./styles/styles.scss";

export const metadata: Metadata = {
  title: "Thirdeyes",
  description: "Writers Empowered by Third Bridge Creative",
  openGraph: {
    images: ["/images/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://use.typekit.net/xgg6bof.css" />
      </head>
      <body className="overflow-hidden">
        <UserProvider>{children}</UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
