import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	addComment,
	getPostComments,
	likeComment,
	editComment,
	deleteComment,
	getAllComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add-comment", verifyToken, addComment);
router.get("/get-post-comments/:postId", getPostComments);
router.put("/like-comment/:commentId", verifyToken, likeComment);
router.put("/edit-comment/:commentId", verifyToken, editComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);
router.get("/get-comments", verifyToken, getAllComments);

export default router;
