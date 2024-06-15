import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
	try {
		const { content, postId, userId } = req.body;

		if (userId !== req.user.id) {
			return next(
				errorHandler(403, "You're not allowed to comment this post!")
			);
		}

		const newComment = new Comment({
			content,
			postId,
			userId,
		});

		await newComment.save();
		res.status(201).json(newComment);
	} catch (error) {
		next(error);
	}
};
