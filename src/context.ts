import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";
import { authenticateUser } from "./utils/auth";

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  userId: string | null;
};

export function createContext(
  initialContext: YogaInitialContext
): GraphQLContext {
  return { prisma, userId: authenticateUser(initialContext.request) };
}
