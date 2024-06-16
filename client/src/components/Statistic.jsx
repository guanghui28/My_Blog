import { useState, useEffect } from "react";
import {
	HiAnnotation,
	HiArrowNarrowUp,
	HiDocumentText,
	HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatisticCard from "./StatisticCard";

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
	const navigate = useNavigate();
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
		} else {
			navigate("/", { replace: true });
		}
	}, [currentUser.isAdmin, navigate]);

	return (
		<div className="p-3 md:mx-auto">
			{/* TODO: COMPONENT */}
			<div className="flex flex-wrap gap-4 justify-center">
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
		</div>
	);
};

export default Statistic;
