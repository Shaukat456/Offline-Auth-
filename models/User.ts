import mongoose, { Document, Schema } from "mongoose";
import Joi from "joi";
import { User } from "../Types";

const UserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  adminId: { type: Schema.Types.ObjectId },
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export const UserModel = mongoose.model<User>("User", UserSchema as any);
