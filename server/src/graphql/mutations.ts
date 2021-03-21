import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError, AuthenticationError } from "apollo-server";

import User from "../models/user.model";
import Post from "../models/post.model";
import { privateKey } from "../mdbconfig";
import { IPost, IUser } from "../models/interfaces";
import JWTverifier from "../helperFunctions/JWTverifier";
import { SignupValidator, LoginValidator } from "../helperFunctions/validators";

export default {
  Mutation: {
    signup: async (parent: any, args: any, context: any, info: any) => {
      let { username, email, password, confirmPassword } = args.signupInput;
      // validate all data
      const val = new SignupValidator(
        username,
        email,
        password,
        confirmPassword
      );
      const { validData, errors } = val.validData();
      if (!validData) throw new UserInputError("An error occured..", errors);
      // Check if username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        errors.existingUser = "Username already exists";
        throw new UserInputError("Username already exists");
      }
      // Check if email is already taken
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        errors.existingEmail = "Email already in use";
        throw new UserInputError("Email already use");
      }
      // encrypt password with a salt of 10
      password = await bcrypt.hash(password, 10);
      confirmPassword = password;
      // Save User into the database
      const newUser: IUser = new User({
        username,
        email,
        password,
        confirmPassword,
        date: new Date().toLocaleDateString(),
      });
      const user: IUser = await newUser.save();
      // generate jwt token with
      const token: string = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        privateKey,
        {
          expiresIn: "1h",
        }
      );
      //doc is the object || console.log(..user) for infos
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    login: async (parent: any, args: any, context: any, info: any) => {
      let { username, email, password } = args.loginInput;
      //validate data
      const val: LoginValidator = new LoginValidator(
        username,
        email,
        password,
        password
      );

      const { errors, validData } = val.validData();
      if (!validData) throw new UserInputError("An error occured..", errors);

      //check if user exists
      const existingUser: IUser = await User.findOne({ username });
      if (!existingUser) {
        errors.existingEmail = "User doesnt exist.";
        throw new UserInputError("User doesnt exist.", { errors });
      }

      //check if pw is the same
      const check: boolean = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!check) {
        errors.correctPW = "Wrong password.";
        throw new UserInputError("Wrong password.", { errors });
      }

      const token: string = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
        },
        privateKey,
        {
          expiresIn: "2h",
        }
      );

      return { ...existingUser._doc, id: existingUser._id, token };
    },

    createPost: async (parent: any, args: any, context: any, info: any) => {
      // check if text input is valid
      const { text } = args;
      if (text.length === 0) throw new UserInputError("There is no text.");
      // check if user exist
      const user = JWTverifier(context);
      if (!user) throw new AuthenticationError("Error");

      const newPost: IPost = new Post({
        id: user.id,
        username: user.username,
        text: text,
        date: new Date().toISOString(),
      });

      const post: IPost = await newPost.save();
      return post;
    },

    deletePost: async (parent: any, args: any, context: any, info: any) => {
      const { post_id } = args;
      // grab the user infomation from jwt
      const user = JWTverifier(context);
      if (!user) throw new AuthenticationError("Error");

      const post: IPost = await Post.findById(post_id);
      if (!post) throw new Error("Post doesnt exit");

      if (user.username === post.username) {
        await post.delete();
        return "Post was deleted.";
      } else {
        throw new Error("Cannot delete this post.");
      }
    },

    updatePost: async (parent: any, args: any, context: any, info: any) => {
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
          return "Post was updated.";
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  },
};
