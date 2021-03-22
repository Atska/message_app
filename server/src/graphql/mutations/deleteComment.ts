import { UserInputError, AuthenticationError } from "apollo-server";
import { IPost } from "../../models/interfaces";

import JWTverifier from "../../helperFunctions/JWTverifier";
import Post from "../../models/post.model";

export default async (parent: any, args: any, context: any) => {
  const { post_id } = args;
  if (!post_id) throw Error("Post doesnt exist.");

  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");

  const post: IPost = await Post.findById(post_id);
  if (!post) throw new UserInputError("Post doesnt exit");

  if (post) {
    const index: number = post.comments.findIndex(
      (comment: { username: string }) => comment.username === user.username
    );

    if (index) {
      // removes object from array
      post.comments.splice(index, 1);
      await post.save();
      return post;
    } else {
      throw new AuthenticationError("Not authorized to delete this post.");
    }
  }
};
