import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ commentItem, onLike }) => {
	const [user, setUser] = useState({});
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
					<p>
						{commentItem.numberOfLikes > 0 &&
							commentItem.numberOfLikes +
								" " +
								(commentItem.numberOfLikes === 1 ? "Like" : "likes")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
