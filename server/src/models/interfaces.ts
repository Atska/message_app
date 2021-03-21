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
  _doc: any;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
