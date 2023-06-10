import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  section: string[];
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  section: String,
});

export const UserModel = mongoose.model<User>("User", UserSchema);
