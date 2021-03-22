import { UserInputError, AuthenticationError } from "apollo-server";
import { IComment, IPost } from "../../models/interfaces";

import JWTverifier from "../../helperFunctions/jwtVerifier";
import Post from "../../models/post.model";

export default async (parent: any, args: any, context: any): Promise<IPost> => {
  const { post_id, text } = args;
  if (text.length === 0) throw new UserInputError("There is no text.");
  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");

  const post: IPost = await Post.findById(post_id);
  if (!post) throw new UserInputError("Post doesnt exit");

  const comment = {
    text: text,
    username: user.username,
    date: new Date().toISOString(),
  };

  post.comments.unshift(comment);
  await post.save();
  return post;
};
