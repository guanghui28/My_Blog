import { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ commentItem }) => {
	const [user, setUser] = useState({});

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
			</div>
		</div>
	);
};

export default Comment;
