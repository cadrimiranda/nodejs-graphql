import type { User } from "@prisma/client";
import { GraphQLContext } from "../context";

const UserResolver = {
  id: (parent: User) => parent.id,
  name: (parent: User) => parent.name,
  email: (parent: User) => parent.email,
  password: (parent: User) => parent.password,
  links: (parent: User, _: unknown, context: GraphQLContext) => {
    return context.prisma.link.findMany({
      where: {
        userId: parent.id,
      },
    });
  },
};

export const UserResolvers = {
  User: UserResolver,
};
