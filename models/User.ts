import mongoose, { Document, Schema } from "mongoose";
import Joi from "joi";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export const UserModel = mongoose.model<User>("User", UserSchema as any);
