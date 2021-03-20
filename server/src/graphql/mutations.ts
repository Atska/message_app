import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import { SignupValidator, LoginValidator } from "./validators";
import User from "../models/user.model";
import { privateKey } from "../mdbconfig";
import { IUser } from "../models/interfaces";

export default {
  Mutation: {
    //https://www.apollographql.com/docs/apollo-server/data/resolvers/#gatsby-focus-wrapper
    signup: async (parent: any, args: any, context: any, info: any) => {
      let { username, email, password, confirmPassword } = args.signupInput;
      //
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new UserInputError("Username already exists");
      }
      // validate all data
      const val = new SignupValidator(
        username,
        email,
        password,
        confirmPassword
      );
      const { validData, errors } = val.validData();
      if (!validData) throw new UserInputError("An error occured..", errors);

      // encrypt password with a salt of 10
      password = await bcrypt.hash(password, 10);
      confirmPassword = password;

      // Save User into the database
      const newUser: IUser = new User({
        username,
        email,
        password,
        confirmPassword,
      });
      const tmp: IUser = await newUser.save();

      // generate jwt token with
      const token: string = jwt.sign(
        { id: tmp.id, email: tmp.email, username: tmp.username },
        privateKey,
        {
          expiresIn: "1h",
        }
      );

      //doc is the object || console.log(..tmp) for infos
      return { ...tmp._doc, id: tmp._id, token };
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
      console.log(errors, validData);
      //check if user exists
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        errors.existingUser = "User or email doesnt exist.";
        throw new UserInputError("Username or email is wrong.", { errors });
      }
      //check if user exists
      const existingEmail = await User.findOne({ email });
      if (!existingEmail) {
        errors.existingUser = "Username doesnt exist.";
        throw new UserInputError("Email doesnt exist.", { errors });
      }
      //check if pw is the same
      const check = await bcrypt.compare(password, existingUser.password);
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
          expiresIn: "1h",
        }
      );
      return { ...existingUser._doc, id: existingUser._id, token };
    },
  },
};
