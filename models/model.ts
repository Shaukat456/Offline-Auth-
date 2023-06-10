import mongoose, { Document, Schema } from "mongoose";

export interface IExample extends Document {
  name: string;
}

const ExampleSchema = new Schema({
  name: { type: String, required: true },
});

export const ExampleModel = mongoose.model<IExample>("Example", ExampleSchema);
