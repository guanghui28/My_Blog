import { useState, useEffect } from "react";
import {
	HiAnnotation,
	HiArrowNarrowUp,
	HiDocumentText,
	HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";

const Statistic = () => {
	const [users, setUsers] = useState([]);
	const [comments, setComments] = useState([]);
	const [posts, setPosts] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);
	const [totalComments, setTotalComments] = useState(0);
	const [lastMonthUsers, setLastMonthUsers] = useState(0);
	const [lastMonthPosts, setLastMonthPosts] = useState(0);
	const [lastMonthComments, setLastMonthComments] = useState(0);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch("/api/user/get-users?limit=5");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setUsers(data.users);
				setTotalUsers(data.totalUsers);
				setLastMonthUsers(data.lastMonthUsers);
			} catch (error) {
				console.log(error.message);
			}
		};

		const fetchPosts = async () => {
			try {
				const res = await fetch("/api/post/get-posts?limit=5");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setPosts(data.posts);
				setTotalPosts(data.totalPosts);
				setLastMonthPosts(data.lastMonthPosts);
			} catch (error) {
				console.log(error.message);
			}
		};

		const fetchComments = async () => {
			try {
				const res = await fetch("/api/comment/get-comments?limit=5");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setComments(data.comments);
				setTotalComments(data.totalComments);
				setLastMonthComments(data.lastMonthComments);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchUsers();
			fetchPosts();
			fetchComments();
		}
	}, [currentUser.isAdmin]);

	return (
		<div className="p-3 md:mx-auto">
			{/* TODO: COMPONENT */}
			<div className="flex flex-wrap gap-4 justify-center">
				{/* USERS */}
				<div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
					<div className="flex justify-between">
						<div className="">
							<h3 className="text-gray-500 font-medium uppercase">
								Total Users
							</h3>
							<p className="text-2xl">{totalUsers}</p>
						</div>
						<HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					</div>
					<div className="flex gap-2 text-sm">
						<span className="text-green-500 flex items-center">
							<HiArrowNarrowUp />
							{lastMonthUsers}
						</span>
						<div className="text-gray-500">Last month</div>
					</div>
				</div>
				{/* POSTS */}
				<div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
					<div className="flex justify-between">
						<div className="">
							<h3 className="text-gray-500 font-medium uppercase">
								Total Posts
							</h3>
							<p className="text-2xl">{totalPosts}</p>
						</div>
						<HiDocumentText className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					</div>
					<div className="flex gap-2 text-sm">
						<span className="text-green-500 flex items-center">
							<HiArrowNarrowUp />
							{lastMonthPosts}
						</span>
						<div className="text-gray-500">Last month</div>
					</div>
				</div>
				{/* COMMENTS */}
				<div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
					<div className="flex justify-between">
						<div className="">
							<h3 className="text-gray-500 font-medium uppercase">
								Total comments
							</h3>
							<p className="text-2xl">{totalComments}</p>
						</div>
						<HiAnnotation className="bg-yellow-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					</div>
					<div className="flex gap-2 text-sm">
						<span className="text-green-500 flex items-center">
							<HiArrowNarrowUp />
							{lastMonthComments}
						</span>
						<div className="text-gray-500">Last month</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistic;
