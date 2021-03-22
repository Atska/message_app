import { AuthenticationError } from "apollo-server";

import Post from "../../models/post.model";
import JWTverifier from "../../helperFunctions/jwtVerifier";
import { IPost } from "../../models/interfaces";

export default async (
  parent: any,
  args: any,
  context: any
): Promise<string> => {
  const { post_id } = args;
  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");

  const post: IPost = await Post.findById(post_id);
  if (!post) throw new Error("Post doesnt exit");

  if (user.username === post.username) {
    await post.delete();
    return "Post was deleted.";
  } else {
    throw new Error("Cannot delete this post.");
  }
};
