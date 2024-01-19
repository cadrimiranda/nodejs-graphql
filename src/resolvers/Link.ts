import { GraphQLError } from "graphql";
import type { Link } from "@prisma/client";
import { GraphQLContext } from "../context";

const LinkResolver = {
  id: (parent: Link) => parent.id,
  description: (parent: Link) => parent.description,
  url: (parent: Link) => parent.url,
  postedBy: (parent: Link, _: unknown, context: GraphQLContext) => {
    return context.prisma.user.findUnique({
      where: {
        id: parent.userId as any,
      },
    });
  },
};

const LinkQueries = {
  feed: async (parent: unknown, args: unknown, context: GraphQLContext) => {
    const { userId } = context;

    if (!userId) {
      throw new GraphQLError("Cannot feed without logging in.");
    }

    return context.prisma.link.findMany();
  },
};

const LinkMutations = {
  postLink: async (
    parent: unknown,
    args: { description: string; url: string },
    context: GraphQLContext
  ) => {
    const { description, url } = args;
    const { userId } = context;

    if (!userId) {
      throw new Error("Cannot post without logging in.");
    }

    const newLink = context.prisma.link.create({
      data: {
        description,
        url,
        postedBy: { connect: { id: userId } },
      },
    });

    return newLink;
  },
};

export const LinkResolvers = {
  Link: LinkResolver,
  Query: LinkQueries,
  Mutation: LinkMutations,
};
