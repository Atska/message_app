// Mutations
import signup from "./mutations/signup";
import login from "./mutations/login";
import like from "./mutations/like";
import createPost from "./mutations/createPost";
import deletePost from "./mutations/deletePost";
import updatePost from "./mutations/updatePost";
import createComment from "./mutations/createComment";
import deleteComment from "./mutations/deleteComment";

// Queries
import findPost from "./queries/findPost";
import allPosts from "./queries/allPosts";
import findUser from "./queries/findUser";

export default {
  Query: {
    findPost: findPost,
    allPosts: allPosts,
    findUser: findUser,
  },
  Mutation: {
    signup: signup,
    login: login,
    like: like,
    createPost: createPost,
    deletePost: deletePost,
    updatePost: updatePost,
    createComment: createComment,
    deleteComment: deleteComment,
  },
};
