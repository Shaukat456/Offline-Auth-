import mongoose, { Document, Schema, mongo } from "mongoose";
import Joi from "joi";
import { Admin } from "../Types";

const AdminSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export const AdminModel = mongoose.model<Admin>("Admin", AdminSchema as any);
