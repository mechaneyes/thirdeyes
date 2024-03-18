import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  
  console.log("cookie access_token", access_token);

  return Response.json({ access_token });
}
