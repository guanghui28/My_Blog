import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../ui/DeleteModal";
import toast from "react-hot-toast";
import MainPostsTable from "../table/MainPostsTable";

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [userPosts, setUserPosts] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [postIdToDelete, setPostIdToDelete] = useState(null);

	// todo: Handle loading

	// todo: Showmore components

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
				toast.error(error.message);
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
			toast.error(error.message);
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
			toast.error(error.message);
		} finally {
			setShowModal(false);
			setPostIdToDelete(null);
		}
	};

	return (
		<main className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && userPosts.length > 0 && (
				<>
					<MainPostsTable
						posts={userPosts}
						setShowModal={setShowModal}
						setPostIdToDelete={setPostIdToDelete}
					/>
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
