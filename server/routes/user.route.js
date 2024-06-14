import express from "express";
import {
	updateUser,
	deleteUser,
	getUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// ALL
router.put("/upload/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
// ADMIN
router.get("/get-users", verifyToken, getUsers);

export default router;
