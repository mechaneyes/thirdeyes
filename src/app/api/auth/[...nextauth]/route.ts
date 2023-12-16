import NextAuth, { NextAuthOptions, Session } from "next-auth";
import type { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";
import Email from "next-auth/providers/email"
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface JWT {
    accessToken?: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  // providers: [
  //   // SpotifyProvider({
  //   //   clientId: process.env.SPOTIFY_CLIENT_ID,
  //   //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  //   // }),
  //   EmailProvider({
  //     server: process.env.EMAIL_SERVER,
  //     from: process.env.EMAIL_FROM,
  //     sendVerificationRequest: async ({
  //       identifier: email,
  //       url,
  //     }: {
  //       identifier: string;
  //       url: string;
  //     }) => {
  //       // Call the cloud Email provider API for sending emails
  //       // See https://docs.sendgrid.com/api-reference/mail-send/mail-send
  //       const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
  //         // The body format will vary depending on provider, please see their documentation
  //         // for further details.
  //         body: JSON.stringify({
  //           personalizations: [{ to: [{ email }] }],
  //           from: { email: "ray@mechaneyes.com" },
  //           subject: "Sign in, you filthy animal!",
  //           content: [
  //             {
  //               type: "text/plain",
  //               value: `Please click here to authenticate - ${url}`,
  //             },
  //           ],
  //         }),
  //         headers: {
  //           // Authentication will also vary from provider to provider, please see their docs.
  //           Authorization: `Bearer ${process.env.SENDGRID_API}`,
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //       });

  //       if (!response.ok) {
  //         const { errors } = await response.json();
  //         console.log('JSON.stringify(errors)', JSON.stringify(errors))
  //         throw new Error(JSON.stringify(errors));
  //       }
  //     },
  //   }),
  // ],
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
