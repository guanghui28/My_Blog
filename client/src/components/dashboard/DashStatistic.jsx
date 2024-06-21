import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
	HiAnnotation,
	HiDocumentText,
	HiOutlineUserGroup,
} from "react-icons/hi";
import StatisticCard from "./StatisticCard";
import SeeAllButton from "../ui/SeeAllButton";
import { useNavigate } from "react-router-dom";
import SubUsersTable from "../table/SubUsersTable";
import SubCommentsTable from "../table/SubCommentsTable";
import SubPostsTable from "../table/SubPostsTable";

const DashStatistic = () => {
	const [users, setUsers] = useState([]);
	const [comments, setComments] = useState([]);
	const [posts, setPosts] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPosts, setTotalPosts] = useState(0);
	const [totalComments, setTotalComments] = useState(0);
	const [lastMonthUsers, setLastMonthUsers] = useState(0);
	const [lastMonthPosts, setLastMonthPosts] = useState(0);
	const [lastMonthComments, setLastMonthComments] = useState(0);
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);

	// todo: handle loading

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
				toast.error(error.message);
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
				toast.error(error.message);
			}
		};

		const fetchComments = async () => {
			try {
				const res = await fetch("/api/comment/get-comments?limit=6");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setComments(data.comments);
				setTotalComments(data.totalComments);
				setLastMonthComments(data.lastMonthComments);
			} catch (error) {
				toast.error(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchUsers();
			fetchPosts();
			fetchComments();
		} else {
			navigate("/", { replace: true });
		}
	}, [currentUser.isAdmin, navigate]);

	return (
		<main className="p-3 md:mx-auto">
			{/* Statistics cards */}
			<div className="flex flex-wrap gap-4 justify-between">
				{/* USERS */}
				<StatisticCard
					tag="users"
					icon={
						<HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					}
					total={totalUsers}
					lastMonth={lastMonthUsers}
				/>
				{/* POSTS */}

				<StatisticCard
					tag="posts"
					icon={
						<HiDocumentText className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					}
					total={totalPosts}
					lastMonth={lastMonthPosts}
				/>
				{/* COMMENTS */}
				<StatisticCard
					tag="comments"
					icon={
						<HiAnnotation className="bg-yellow-600 text-white rounded-full text-5xl p-3 shadow-lg" />
					}
					total={totalComments}
					lastMonth={lastMonthComments}
				/>
			</div>

			{/* TABLE */}
			<div className="flex flex-wrap gap-4 py-3 mx-auto justify-center mt-5">
				{/* USERS */}
				<div className="flex bg-slate-50 flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
					<div className="flex justify-between p-3 text-sm font-semibold">
						<h1 className="text-center p-2">Recent Users</h1>
						<SeeAllButton href="/dashboard/users" />
					</div>
					<SubUsersTable users={users} />
				</div>

				{/* COMMENTS */}
				<div className="flex flex-1 min-w-[400px] bg-slate-50 flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
					<div className="flex justify-between p-3 text-sm font-semibold">
						<h1 className="text-center p-2">Recent Comments</h1>
						<SeeAllButton href="/dashboard/comments" />
					</div>
					<SubCommentsTable comments={comments} />
				</div>

				{/* POSTS */}
				<div className="flex flex-1 bg-slate-50 flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
					<div className="flex justify-between p-3 text-sm font-semibold">
						<h1 className="text-center p-2">Recent Posts</h1>
						<SeeAllButton href="/dashboard/posts" />
					</div>
					<SubPostsTable posts={posts} />
				</div>
			</div>
		</main>
	);
};

export default DashStatistic;
