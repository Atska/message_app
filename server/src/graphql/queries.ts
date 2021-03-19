import Post from "../models/post.model";
import { IPost } from "../models/interfaces";

export default {
  Query: {
    allPosts: async (): Promise<IPost[]> => {
      try {
        const posts = await Post.find();
        console.log(posts);
        return posts;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};
