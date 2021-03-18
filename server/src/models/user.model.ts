import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: String;
  password: String;
  confirmPassword: String;
  email: String;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  email: { type: String, required: true },
});

export default model<IUser>("User", UserSchema);
