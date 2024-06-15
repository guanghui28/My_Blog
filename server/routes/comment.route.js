import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);

export default router;
