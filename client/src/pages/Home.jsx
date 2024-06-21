/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import CallToAction from "../components/ui/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch("/api/post/get-posts");
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setPosts(data.posts);
			} catch (error) {
				toast.error(error.message);
			}
		};

		fetchPosts();
	}, []);
	return (
		<main>
			<section className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold lg:text-6xl">
					Welcome to GuangHui's Blog 👋
				</h1>
				<p className="text-slate-700 dark:text-slate-100/80 text-xs sm:text-sm md:text-lg">
					Welcome! You've landed on my ReactJS learning playground, taking the
					form of an interactive blog app. I'm using this project to dive deep
					into React concepts like component-based architecture, state
					management, and more. Check back often to see the app evolve as I
					build my React skills
				</p>
				<div>
					<Link
						to="/search"
						className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
					>
						View all posts
					</Link>
				</div>
			</section>

			<section className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
				{posts.length > 0 && (
					<div className="flex flex-col gap-6">
						<h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
						<div className="flex flex-wrap items-center justify-center gap-4">
							{posts.map((post) => (
								<PostCard key={post._id} post={post} />
							))}
						</div>
					</div>
				)}

				<div className="text-center">
					<Link
						to="/search"
						className="text-xs sm:text-sm text-teal-500 font-bold hover:underline "
					>
						View all posts
					</Link>
				</div>
			</section>

			<section className="p-3 bg-amber-100 dark:bg-slate-700">
				<CallToAction />
			</section>
		</main>
	);
};

export default Home;
