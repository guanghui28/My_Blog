import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	addComment,
	getPostComments,
	likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);
router.get("/get-post-comments/:postId", getPostComments);
router.put("/like-comment/:commentId", verifyToken, likeComment);

export default router;
