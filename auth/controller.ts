import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { AdminModel } from "../models/Admin";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Types";
import { Aggregate } from "mongoose";

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body as User;
    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ email, password });

    if (existingUser) {
      res
        .status(409)
        .json({ error: "User already exists, try a different email address" });
      return;
    }

    await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
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

    console.log({ existingUser });

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
    console.error("Error in ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function removeUser(req: Request, res: Response): Promise<void> {
  const { id } = req.body;
  try {
    const data = await UserModel.findByIdAndDelete(id ? id : "");

    !data ? res.json("") : res.json(data);
  } catch (error) {
    if (error instanceof Error) console.error("Error ", error?.message);

    res.status(500).json({ error: "Internal server error" });
  }
}

// export async function getProducerByUserId(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const { id: userId } = req.params;

//   try {
//     const data = await AdminModel.aggregate([
//       {
//         $match: {
//           _id: userId,
//         },
//       },
//       // Add additional aggregation stages if needed
//     ]);

//     res.send(data);
//   } catch (error) {
//     console.error("Error: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

export async function getUserByProducerId(
  req: Request,
  res: Response
): Promise<void> {
  const { id: producerId } = req.params;
  try {
    const data = await UserModel.aggregate([
      {
        $match: {
          producerId: producerId,
        },
      },
    ]);

    res.send(data);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
