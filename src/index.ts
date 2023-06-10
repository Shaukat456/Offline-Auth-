import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;
const mongoUri = process.env.MONGODB_URI || "";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.use("/auth", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
