import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [userPosts, setUserPosts] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [postIdToDelete, setPostIdToDelete] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`
					/api/post/get-posts?userId=${currentUser._id}
				`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setUserPosts(data.posts);
				if (data.posts.length < 9) {
					setShowMore(false);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (currentUser.isAdmin) {
			fetchPosts();
		}
	}, [currentUser._id, currentUser.isAdmin]);

	const handleShowMore = async () => {
		const startIndex = userPosts.length;
		try {
			const res = await fetch(
				`/api/post/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setUserPosts((prev) => [...prev, ...data.posts]);
			if (data.posts.length < 9) {
				setShowMore(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeletePost = async () => {
		try {
			const res = await fetch(
				`/api/post/delete-post/${postIdToDelete}/${currentUser._id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setUserPosts((prev) =>
				prev.filter((post) => post._id !== postIdToDelete)
			);
		} catch (error) {
			console.log(error.message);
		} finally {
			setShowModal(false);
			setPostIdToDelete(null);
		}
	};

	return (
		<main className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && userPosts.length > 0 && (
				<>
					<Table hoverable className="shadow-md">
						<Table.Head>
							<Table.HeadCell>Date updated</Table.HeadCell>
							<Table.HeadCell>Post image</Table.HeadCell>
							<Table.HeadCell>Post title</Table.HeadCell>
							<Table.HeadCell>Category</Table.HeadCell>
							<Table.HeadCell>Delete</Table.HeadCell>
							<Table.HeadCell>
								<span className="hidden md:block">Edit</span>
							</Table.HeadCell>
						</Table.Head>
						<Table.Body>
							{userPosts.map((post) => (
								<Table.Row
									key={post._id}
									className="divide-y bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell>
										{new Date(post.updatedAt).toLocaleDateString()}
									</Table.Cell>
									<Table.Cell>
										<Link to={`/post/${post.slug}`}>
											<img
												src={post.image}
												alt={post.title}
												className="w-20 h-10 object-cover bg-gray-500"
											/>
										</Link>
									</Table.Cell>
									<Table.Cell>
										<Link
											className="font-medium text-gray-900 dark:text-white/90"
											to={`/post/${post.slug}`}
										>
											{post.title}
										</Link>
									</Table.Cell>
									<Table.Cell>{post.category}</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true);
												setPostIdToDelete(post._id);
											}}
											className="font-medium text-red-500 hover:underline transition cursor-pointer"
										>
											Delete
										</span>
									</Table.Cell>
									<Table.Cell>
										<Link
											className="text-teal-500 hover:underline transition cursor-pointer"
											to={`/update-post/${post._id}`}
										>
											<span>Edit</span>
										</Link>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
					{showMore && (
						<button
							onClick={handleShowMore}
							className="w-full text-teal-500 self-center text-sm py-6"
						>
							Show more
						</button>
					)}
				</>
			)}
			{userPosts.length === 0 && <p>You have no posts yet 😓.</p>}
			<DeleteModal
				handleClick={handleDeletePost}
				objectName={"post"}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</main>
	);
};

export default DashPosts;
