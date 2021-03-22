import jwt from "jsonwebtoken";
import { privateKey } from "../mdbconfig";
import { AuthenticationError } from "apollo-server";

/**
 * Verify and decode the jwt
 * @param context Context object from graphql
 * @returns user object
 */
export default function JWTverifier(context: any) {
  const bearerToken: string = context.req.headers.authorization;
  if (!bearerToken) throw new AuthenticationError("There is no token.");

  const token: string = bearerToken.replace(/^Bearer\s+/, "");
  if (!token) throw new AuthenticationError("You must be logged in.");

  const user: any = jwt.verify(token, privateKey);
  return user;
}
