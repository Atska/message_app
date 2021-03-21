import User from "../../models/user.model";
import { IUser } from "../../models/interfaces";

export default async (parent: any, args: any, context: any, info: any) => {
  try {
    const { username } = args;
    const user: IUser = await User.findOne({ username });
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};
