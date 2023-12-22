import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

// export default createYoga<{
//   req: NextApiRequest
//   res: NextApiResponse
// }>({
//   schema,
//   context: createContext,
//   graphqlEndpoint: '/api/graphql'
// })

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

const { handleRequest } = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  context: createContext,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
