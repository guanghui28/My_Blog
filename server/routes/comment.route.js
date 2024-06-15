import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	addComment,
	getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);
router.get("/get-post-comments/:postId", getPostComments);

export default router;
