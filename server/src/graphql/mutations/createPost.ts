import { UserInputError, AuthenticationError } from "apollo-server";

import Post from "../../models/post.model";
import JWTverifier from "../../helperFunctions/jwtVerifier";
import { IPost } from "../../models/interfaces";

export default async (_: any, args: any, context: any): Promise<IPost> => {
  // check if text input is valid
  const { text } = args;
  if (text.length === 0) throw new UserInputError("There is no text.");
  if (text.length >= 200)
    throw new UserInputError("Post can only contain 200 letters.");
  // check if user exist and authenticate
  console.log(context);
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");

  const newPost: IPost = new Post({
    id: user.id,
    username: user.username,
    text: text,
    date: new Date().toISOString(),
  });

  const post: IPost = await newPost.save();
  return post;
};
