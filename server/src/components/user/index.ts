export { default as authRouter } from "./auth/router";
export { localAuthStrategy, googleAuthStrategy } from "./auth/strategies";
export { default as avatarRouter } from "./avatar/router";
import typeDefs from "./type-defs";
import * as resolvers from "./resolvers";

export default {
  typeDefs,
  resolvers,
};
