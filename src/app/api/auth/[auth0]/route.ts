import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/chat",
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/chat",
  }),
});

// export const GET = handleAuth();
export const POST = handleAuth();
export const OPTIONS = handleAuth();
