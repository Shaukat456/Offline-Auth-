import { Request, Response } from "express";
import { ExampleModel } from "../models/model";

export async function getExample(req: Request, res: Response): Promise<void> {
  try {
    const data = await ExampleModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error in getExample:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
