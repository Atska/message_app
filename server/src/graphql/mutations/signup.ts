import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import User from "../../models/user.model";
import { privateKey } from "../../mdbconfig";
import { IUser } from "../../models/interfaces";
import { SignupValidator } from "../../helperFunctions/validators";

interface ISignUp {
  username: string;
  id: string;
  token: string;
  email: string;
  date: string;
}

export default async (_: any, args: any): Promise<ISignUp> => {
  let { username, email, password, confirmPassword } = args.signupInput;
  // validate all data
  const val = new SignupValidator(username, email, password, confirmPassword);
  const { validData, errors } = val.validData();
  if (!validData) throw new UserInputError("Passwords are wrong", errors);
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
  // generate jwt token so user is authenticated
  const token: string = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    privateKey,
    {
      expiresIn: "2h",
    }
  );
  //doc is the object || console.log(..user) for infos
  return {
    ...user._doc,
    id: user._id,
    token,
  };
};
