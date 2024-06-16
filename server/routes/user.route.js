import express from "express";
import {
	updateUser,
	deleteUser,
	getUsers,
	getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// PUBLIC
router.get("/get-me/:userId", getUser);
// ALL
router.put("/upload/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
// ADMIN
router.get("/get-users", verifyToken, getUsers);

export default router;
