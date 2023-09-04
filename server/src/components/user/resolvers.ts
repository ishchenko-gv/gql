import { GraphQLError } from "graphql";
import User from "./model";
import { gqlCtx } from "../../types";

export async function userProfile(_: {}, __: {}, ctx: gqlCtx) {
  const user = await User.findById(ctx.userId);

  if (!user) {
    throw new GraphQLError("Unathorized", {
      extensions: {
        http: {
          status: 401,
        },
      },
    });
  }

  if (!user.profile) {
    throw new GraphQLError("An error occurred while getting the profile", {
      extensions: {
        http: {
          status: 500,
        },
      },
    });
  }

  const { firstName, lastName, fullName } = user.profile;

  return {
    firstName,
    lastName,
    fullName,
  };
}
