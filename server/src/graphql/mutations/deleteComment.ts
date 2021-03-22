import { UserInputError, AuthenticationError } from "apollo-server";
import { IPost } from "../../models/interfaces";

import JWTverifier from "../../helperFunctions/jwtVerifier";
import Post from "../../models/post.model";

export default async (_: any, args: any, context: any): Promise<string> => {
  const { post_id, comment_id } = args;
  if (!post_id) throw Error("Post doesnt exist.");

  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");
  // get the post
  const post: IPost = await Post.findById(post_id);
  if (!post) throw new UserInputError("Post doesnt exit");

  if (post) {
    // get the index of the comment
    const index: number = post.comments.findIndex(
      (com: { id: string }) => com.id === comment_id
    );
    if (!post.comments[index])
      throw new UserInputError("Comment doesnt exist.");

    if (user.username !== post.comments[index].username)
      throw new AuthenticationError("Not authorized!");
    // removes object from array
    post.comments.splice(index, 1);
    await post.save();
    return "Deleted post.";
  }
};
