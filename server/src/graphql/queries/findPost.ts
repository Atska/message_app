import Post from "../../models/post.model";
import { IPost } from "../../models/interfaces";

export default async (parent: any, args: any) => {
  try {
    const { post_id } = args;
    const post: IPost = await Post.findById(post_id);
    if (!post) throw new Error("Post doesnt exist.");
    return post;
  } catch (err: any) {
    throw new Error(err);
  }
};
