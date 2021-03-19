import { Schema, model } from "mongoose";
//
import { IPost } from "./interfaces";

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
