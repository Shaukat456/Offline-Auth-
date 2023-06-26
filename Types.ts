import mongoose from "mongoose";
export interface User {
  username: string;
  password: string;
  repeat_password: string;
  adminId: mongoose.Types.ObjectId;
  email: string;
}
export interface Admin {
  username: string;
  password: string;
  repeat_password: string;
  users: mongoose.Types.ObjectId[];
  email: string;
}
