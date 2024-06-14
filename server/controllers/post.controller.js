import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
	const { title, content } = req.body;

	if (!req.user.isAdmin) {
		return next(errorHandler(403, "Only Admin can create a post!"));
	}

	if (!content || !title) {
		return next(errorHandler(400, "Please provide all required fields!"));
	}

	const slug = title
		.split(" ")
		.join("-")
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, "-");

	const newPost = new Post({
		...req.body,
		slug,
		userId: req.user.id,
	});

	try {
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		next(error);
	}
};
