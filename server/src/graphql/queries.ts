import Post from "../models/post.model";
import User from "../models/user.model";
import { IPost } from "../models/interfaces";

export default {
  Query: {
    allPosts: async (): Promise<IPost[]> => {
      try {
        //-1 = newst post first, 1 = oldest post first
        const posts = await Post.find().sort({ _id: -1 }).limit(10);
        return posts;
      } catch (err: any) {
        throw new Error(err);
      }
    },

    findPost: async (parent: any, args: any) => {
      try {
        const { post_id } = args;
        const post = await Post.findById(post_id);
        if (!post) throw new Error("Post doesnt exist.");
        return post;
      } catch (err: any) {
        throw new Error(err);
      }
    },

    findUser: async (parent: any, args: any, context: any, info: any) => {
      try {
        const { username } = args;
        const user = await User.findOne({ username });
        return user;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};
