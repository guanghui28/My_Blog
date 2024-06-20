import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import DeleteModal from "../DeleteModal";

const CommentSection = ({ postId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [comment, setComment] = useState("");
	const [commentList, setCommentList] = useState([]);
	const [commentError, setCommentError] = useState(null);
	const [commentIdToDelete, setCommentIdToDelete] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchComment = async () => {
			try {
				const res = await fetch(`/api/comment/get-post-comments/${postId}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setCommentList(data.comments);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchComment();
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (comment.length > 1000) {
			setCommentError("Comment has maximum 1000 characters");
			return;
		}

		try {
			setCommentError(null);
			const res = await fetch(`/api/comment/add-comment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: currentUser._id,
					postId,
					content: comment,
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			} else {
				setCommentList([data, ...commentList]);
			}
		} catch (error) {
			setCommentError(error.message);
		} finally {
			setComment("");
		}
	};

	const handleLike = async (commentId) => {
		try {
			if (!currentUser) {
				return navigate("/sign-in");
			}
			const res = await fetch(`/api/comment/like-comment/${commentId}`, {
				method: "PUT",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			} else {
				setCommentList((prev) =>
					prev.map((c) => {
						if (c._id === commentId) {
							return {
								...c,
								likes: data.likes,
								numberOfLikes: data.likes.length,
							};
						} else {
							return c;
						}
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async (commentId, editedContent) => {
		setCommentList((prev) =>
			prev.map((c) => {
				if (c._id === commentId) {
					return {
						...c,
						content: editedContent,
					};
				}
				return c;
			})
		);
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(
				`/api/comment/delete-comment/${commentIdToDelete}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}

			setCommentList((prev) => prev.filter((c) => c._id !== commentIdToDelete));
		} catch (error) {
			console.log(error.message);
		} finally {
			setShowModal(false);
			setCommentIdToDelete(null);
		}
	};

	return (
		<div className="max-w-2xl mx-auto w-full p-3">
			{currentUser ? (
				<div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
					<p>Signed in as:</p>
					<img
						className="h-5 w-5 rounded-full object-cover"
						src={currentUser.profilePicture}
						alt={currentUser.username}
					/>
					<Link
						className="text-xs text-cyan-600 hover:text-cyan-800"
						to={`/dashboard?tab=profile`}
					>
						@{currentUser.username}
					</Link>
				</div>
			) : (
				<div className="text-sm text-teal-500 my-5 flex gap-1">
					You must be signed in to comment.
					<Link className="text-blue-500 hover:underline" to="/sign-in">
						Sign in
					</Link>
				</div>
			)}
			{currentUser && (
				<form
					onSubmit={handleSubmit}
					className="border border-teal-500 rounded-md p-3"
				>
					<Textarea
						placeholder="Add a comment..."
						rows={3}
						maxLength={1000}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<div className="flex justify-between items-center mt-5">
						<p className="text-gray-500 text-xs">
							{1000 - comment.length} characters remaining
						</p>
						<Button outline gradientDuoTone="purpleToBlue" type="submit">
							Submit
						</Button>
					</div>
					{commentError && (
						<Alert color="failure" className="mt-2">
							{commentError}
						</Alert>
					)}
				</form>
			)}
			{commentList.length > 0 && (
				<>
					<div className="text-sm my-5 flex items-center gap-1">
						<p>Comments</p>
						<div className="border border-gray-400 py-1 px-2 rounded-sm">
							<p>{commentList.length}</p>
						</div>
					</div>
					{commentList.map((commentItem) => (
						<Comment
							key={commentItem._id}
							commentItem={commentItem}
							onLike={handleLike}
							onEdit={handleEdit}
							onDelete={(commentId) => {
								setShowModal(true);
								setCommentIdToDelete(commentId);
							}}
						/>
					))}
				</>
			)}
			{commentList.length === 0 && (
				<p className="text-xl my-5">No comments yet 🥺 .</p>
			)}

			<DeleteModal
				handleClick={handleDelete}
				objectName={"comment"}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</div>
	);
};

export default CommentSection;
