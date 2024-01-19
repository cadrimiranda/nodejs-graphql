import * as jwt from "jsonwebtoken";

export const APP_SECRET = "GraphQL-is-aw3some";

export interface AuthTokenPayload {
  userId: string;
}

export function authenticateUser(request: Request): string | null {
  const header = request.headers.get("authorization");

  if (header !== null) {
    const token = header.split(" ")[1];
    const tokenPayload = jwt.verify(token, APP_SECRET) as jwt.JwtPayload;
    return tokenPayload.userId;
  }

  return null;
}
