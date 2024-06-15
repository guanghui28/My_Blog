import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		numberOfLikes: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
