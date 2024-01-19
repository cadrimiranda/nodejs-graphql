import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "node:fs";
import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./schema.graphql", "utf8");

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs,
});
