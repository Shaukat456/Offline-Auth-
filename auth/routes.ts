import express from "express";
import { registerUser, loginUser, getAllUsers } from "../auth/controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/signUp", registerUser);
router.post("/login", loginUser);

export default router;
