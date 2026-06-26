import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6c8b83438bc0190ebc4dbb929c4b58596012c1ff', queries,  });
export default client;
  