import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
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

const typeKitLoader = {
  href: 'https://use.typekit.net/xgg6bof.css',
  crossOrigin: 'anonymous',
  rel: 'preconnect',
}

// Headers configuration
export const headers = {
  link: [typeKitLoader],
}

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
