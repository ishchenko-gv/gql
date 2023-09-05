export { default as authRouter } from "./auth/router";
export { default as setupAuthStrategies } from "./auth/strategies";
export { default as avatarRouter } from "./avatar/router";
import typeDefs from "./type-defs";
import * as resolvers from "./resolvers";

export default {
  typeDefs,
  resolvers,
};
