export { default as authRouter } from "./auth/router";
export { default as setupAuthStrategies } from "./auth/strategies";
import typeDefs from "./type-defs";
import * as resolvers from "./resolvers";

export default {
  typeDefs,
  resolvers,
};
