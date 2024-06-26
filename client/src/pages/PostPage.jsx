import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/ui/CallToAction";
import CommentSection from "../components/comments/CommentSection";
import PostCard from "../components/PostCard";
const PostPage = () => {
	const { postSlug } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [recentPosts, setRecentPosts] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/post/get-posts?slug=${postSlug}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setError(null);
				setPost(data.posts[0]);
			} catch (error) {
				setError();
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [postSlug]);

	useEffect(() => {
		const fetchRecentPosts = async () => {
			try {
				const res = await fetch(`/api/post/get-posts?limit=3`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}

				setRecentPosts(data.posts);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchRecentPosts();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spinner size="xl" />
			</div>
		);
	}

	if (error) {
		return <h3 className="text-3xl text-center">{error}</h3>;
	}

	return (
		post && (
			<main className="min-h-screen p-3 flex flex-col max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
					{post.title}
				</h1>
				<Link
					to={`/search?category=${post.category}`}
					className="text-xl self-center mt-5"
				>
					<Button color="gray" pill size="xs">
						{post.category}
					</Button>
				</Link>
				<div className="mx-auto">
					<img
						src={post.image}
						alt={post.title}
						className="mt-10 p-3 max-h-[700px] max-w-[700px] w-full object-cover shadow-md"
					/>
				</div>
				<div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
					<span className="italic">
						{new Date(post.createdAt).toLocaleDateString()}
					</span>
					<span>{(post.content.length / 1000).toFixed(0)} mins read</span>
				</div>
				<div
					className="p-3 max-w-2xl mx-auto w-full post-content"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				<div className="max-w-4xl mx-auto w-full">
					<CallToAction />
				</div>
				<CommentSection postId={post._id} />

				<div className="flex flex-col justify-center items-center mb-5">
					<h2 className="text-xl mt-5 font-bold">Recent Articles</h2>
					<div className="flex flex-wrap gap-5 mt-5 justify-center">
						{recentPosts?.length > 0 &&
							recentPosts.map((post) => (
								<PostCard key={post._id} post={post} />
							))}
					</div>
				</div>
			</main>
		)
	);
};

export default PostPage;
