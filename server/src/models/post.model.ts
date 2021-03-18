import { Schema, model, Document } from "mongoose";

const PostSchema = new Schema({
  text: String,
  username: String,
  date: String,
  comments: [
    {
      text: String,
      username: String,
      date: String,
    },
  ],
});
