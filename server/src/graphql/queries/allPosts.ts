import Post from "../../models/post.model";
import { IPost } from "../../models/interfaces";

export default async (): Promise<IPost[]> => {
  try {
    //-1 = newst post first, 1 = oldest post first
    const posts: IPost[] = await Post.find().sort({ _id: -1 }).limit(10);
    return posts;
  } catch (err: any) {
    throw new Error(err);
  }
};
