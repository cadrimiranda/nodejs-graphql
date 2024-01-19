import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";
import { GraphQLContext } from "../context";

const AuthMutations = {
  login: async (
    parent: unknown,
    args: { email: string; password: string },
    context: GraphQLContext
  ) => {
    const user = await context.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  signup: async (
    parent: unknown,
    args: { email: string; password: string; name: string },
    context: GraphQLContext
  ) => {
    const { email, name } = args;
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { email, name, password },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
};

export const AuthResolvers = {
  Mutation: AuthMutations,
};
