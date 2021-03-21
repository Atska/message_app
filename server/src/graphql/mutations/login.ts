import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import User from "../../models/user.model";
import { privateKey } from "../../mdbconfig";
import { IUser } from "../../models/interfaces";
import { LoginValidator } from "../../helperFunctions/validators";

export default async (parent: any, args: any, context: any, info: any) => {
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
  const check: boolean = await bcrypt.compare(password, existingUser.password);
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
};
