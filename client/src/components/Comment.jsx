import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ commentItem, onLike, onEdit }) => {
	const [user, setUser] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState("");
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/user/${commentItem.userId}`);
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				} else {
					setUser(data.user);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		getUser();
	}, [commentItem.userId]);

	const handleEdit = async () => {
		setIsEditing(true);
		setEditedContent(commentItem.content);
	};

	const handleSaveEdit = async () => {
		try {
			const res = await fetch(`/api/comment/edit-comment/${commentItem._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: editedContent,
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}

			onEdit(commentItem._id, editedContent);
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsEditing(false);
		}
	};

	return (
		<div className="flex p-4 border-b dark:border-gray-600 text-sm">
			<div className="flex-shrink-0 mr-3">
				<img
					className="w-10 h-10 rounded-full bg-gray-200"
					src={user.profilePicture}
					alt={user.username}
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center mb-1">
					<span className="font-bold mr-1 text-xs truncate">
						{user ? `@${user.username}` : "anonymous user"}
					</span>
					<span className="">{moment(commentItem.createdAt).fromNow()}</span>
				</div>
				{isEditing ? (
					<>
						<Textarea
							value={editedContent}
							className="mb-2"
							onChange={(e) => setEditedContent(e.target.value)}
						/>
						<div className="flex justify-end gap-4 text-xs">
							<Button
								type="button"
								size="sm"
								gradientDuoTone="purpleToBlue"
								onClick={handleSaveEdit}
							>
								Save
							</Button>
							<Button
								outline
								type="button"
								size="sm"
								gradientDuoTone="purpleToBlue"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
						</div>
					</>
				) : (
					<>
						<p className="text-gray-500 mb-2">{commentItem.content}</p>
						<div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
							<button
								type="button"
								onClick={() => onLike(commentItem._id)}
								className={`text-gray-400 hover:text-blue-500 ${
									currentUser && commentItem.likes.includes(currentUser._id)
										? "!text-blue-500"
										: ""
								}`}
							>
								<FaThumbsUp className="text-sm" />
							</button>
							<span>
								{commentItem.numberOfLikes > 0 &&
									commentItem.numberOfLikes +
										" " +
										(commentItem.numberOfLikes === 1 ? "Like" : "likes")}
							</span>
							{currentUser &&
							(currentUser._id === commentItem.userId ||
								currentUser.isAdmin) ? (
								<button
									type="button"
									className="text-gray-400 hover:text-blue-500"
									onClick={handleEdit}
								>
									Edit
								</button>
							) : null}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Comment;
