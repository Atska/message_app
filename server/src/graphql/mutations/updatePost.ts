import { UserInputError, AuthenticationError } from "apollo-server";

import Post from "../../models/post.model";
import JWTverifier from "../../helperFunctions/JWTverifier";
import { IPost } from "../../models/interfaces";

export default async (
  parent: any,
  args: any,
  context: any
): Promise<string> => {
  const { post_id, text } = args;
  // check if text input is valid
  if (text.length === 0) throw new UserInputError("There is no text.");
  // grab the user infomation from jwt
  const user = JWTverifier(context);
  if (!user) throw new AuthenticationError("Error");

  const post: IPost = await Post.findById(post_id);
  if (!post) throw new Error("Post doesnt exit");

  if (user.username === post.username) {
    try {
      const newText: string = text;
      await Post.findByIdAndUpdate(post, { text: newText });
      return "Post successfully updated.";
    } catch (err) {
      throw new Error(err);
    }
  }
};
