import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../controllers/controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/signUp", registerUser);
router.post("/login", loginUser);

export default router;
