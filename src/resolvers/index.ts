import { mergeResolvers } from "@graphql-tools/merge";

import { LinkResolvers } from "./Link";
import { AuthResolvers } from "./Auth";
import { UserResolvers } from "./User";

const resolvers = mergeResolvers([LinkResolvers, AuthResolvers, UserResolvers]);

export { resolvers };
