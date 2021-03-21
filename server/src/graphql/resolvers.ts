import queriesResolver from "./queries";
// Mutations
import signup from "./mutations/signup";
import login from "./mutations/login";
import createPost from "./mutations/createPost";
import deletePost from "./mutations/deletePost";
import updatePost from "./mutations/updatePost";

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
    createPost: createPost,
    deletePost: deletePost,
    updatePost: updatePost,
  },
};
