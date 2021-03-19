import { Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  username: string;
  date: string;
}

export interface IPost extends Document {
  text: string;
  username: string;
  date: string;
  comments: Array<IComment>;
  user_id: IUser;
}

export interface IUser extends Document {
  username: String;
  password: String;
  confirmPassword: String;
  email: String;
}
