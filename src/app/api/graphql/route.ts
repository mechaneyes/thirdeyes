import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { createContext } from "./context";
import type { NextApiRequest, NextApiResponse } from "next";

const { handleRequest } = createYoga({
  schema: schema,
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: {
    Response: Response,
    Request: Request,
  },
});

// export {
//   handleRequest as GET,
//   handleRequest as POST,
//   handleRequest as OPTIONS,
// };




// const { handleRequest } = createYoga({
//   graphqlEndpoint: '/api/graphql',
//   schema: schema,
//   fetchAPI: {
//     Response: Response,
//     Request: Request,
//   },
// })

export { handleRequest as GET, handleRequest as POST }




// export default createYoga<{
//   req: NextApiRequest;
//   res: NextApiResponse;
// }>({
//   schema,
//   context: createContext,
//   graphqlEndpoint: "/api/graphql",
//   fetchAPI: { Response },
// });

export const config = {
  api: {
    bodyParser: false,
  },
};
