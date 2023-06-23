import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  removeUser,
} from "../auth/controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/signUp", registerUser);
router.post("/login", loginUser);
router.delete("/remove", removeUser);

export default router;
