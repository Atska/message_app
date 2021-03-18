import { Schema, model, Document } from "mongoose";
//
import { IUser } from "./user.model";

interface IComment extends Document {
  text: string;
  username: string;
  date: string;
}

interface IPost extends Document {
  text: string;
  username: string;
  date: string;
  comments: Array<IComment>;
  user_id: IUser;
}

const PostSchema = new Schema({
  text: String,
  username: String,
  date: String,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      text: String,
      username: String,
      date: String,
    },
  ],
  likes: [
    {
      username: String,
      date: String,
    },
  ],
});

export default model<IPost>("Post", PostSchema);
