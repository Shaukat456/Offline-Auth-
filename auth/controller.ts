import { Request, Response } from "express";
import { User, UserModel } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ name, password });

    if (existingUser) {
      res
        .status(409)
        .json({ error: "User already exists, try a different email address" });
      return;
    }

    // Hash the password
    await bcrypt.hash(password, 10);
    console.log({ password });

    // Create a new user instance
    const user: User = new UserModel({
      name,
      password: password,
    });

    const savedUser = await user.save();

    console.log({ savedUser });

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, password } = req.body;

    // Check if the user exists in the database
    const existingUser = await UserModel.findOne({ name, password });

    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const token = jwt.sign({ userId: existingUser._id }, "");

    res.status(200).json({ token, msg: "user signIn succesfully" });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error in getExample:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
