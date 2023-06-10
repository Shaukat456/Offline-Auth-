import express from "express";
import { getExample } from "../controllers/controller";

const router = express.Router();

router.get("/example", getExample);

export default router;
