import { UserInputError, AuthenticationError } from "apollo-server";
import { ILike, IPost } from "../../models/interfaces";

import JWTverifier from "../../helperFunctions/jwtVerifier";
import Post from "../../models/post.model";

export default async (_: any, args: any, context: any) => {
  const { post_id } = args;
  if (!post_id) throw Error("Like doesnt exist.");

  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");
  // get the post
  const post: IPost = await Post.findById(post_id);
  if (!post) throw new UserInputError("Post doesnt exit");

  const elem: ILike = post.likes.find(
    (like: { username: string }) => like.username === user.username
  );

  if (elem) {
    // Post is liked so we unlike it
    if (user.username === elem.username) {
      post.likes.remove(elem);
      await post.save();
      return "Unliked";
    }
  } else {
    // Post isnt liked -> liked
    post.likes.push({
      username: user.username,
      date: new Date().toISOString(),
    });
    await post.save();
    return "Liked";
  }
};
