import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const DashComment = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [comments, setComments] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);
	const [commentIdToDelete, setCommentIdToDelete] = useState(null);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				setError(null);
				const res = await fetch(`
					/api/comment/get-comments?sort=asc
				`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setComments(data.comments);
				if (data.comments.length < 9) {
					setShowMore(false);
				}
			} catch (error) {
				setError(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchComments();
		}
	}, [currentUser._id, currentUser.isAdmin]);

	const handleShowMore = async () => {
		const startIndex = comments.length;
		try {
			setError(null);
			const res = await fetch(
				`/api/comment/get-comments?sort=asc&startIndex=${startIndex}`
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setComments((prev) => [...prev, ...data.comments]);
			if (data.users.length < 9) {
				setShowMore(false);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const handleDeleteComment = async () => {
		try {
			const res = await fetch(
				`/api/comment/delete-comment/${commentIdToDelete}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setComments((prev) =>
				prev.filter((user) => user._id !== commentIdToDelete)
			);
		} catch (error) {
			console.log(error.message);
		} finally {
			setShowModal(false);
			setCommentIdToDelete(null);
		}
	};

	return (
		<main className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && comments.length > 0 ? (
				<>
					<Table hoverable className="shadow-md">
						<Table.Head>
							<Table.HeadCell>Date updated</Table.HeadCell>
							<Table.HeadCell>Comment content</Table.HeadCell>
							<Table.HeadCell>Number of likes</Table.HeadCell>
							<Table.HeadCell>PostId</Table.HeadCell>
							<Table.HeadCell>UserId</Table.HeadCell>
							<Table.HeadCell>Delete</Table.HeadCell>
						</Table.Head>
						<Table.Body>
							{comments.map((comment) => (
								<Table.Row
									key={comment._id}
									className="divide-y bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell>
										{new Date(comment.updatedAt).toLocaleDateString()}
									</Table.Cell>
									<Table.Cell>{comment.content}</Table.Cell>
									<Table.Cell>{comment.numberOfLikes}</Table.Cell>
									<Table.Cell>{comment.postId}</Table.Cell>
									<Table.Cell>{comment.userId}</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true);
												setCommentIdToDelete(comment._id);
											}}
											className="font-medium text-red-500 hover:underline transition cursor-pointer"
										>
											Delete
										</span>
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
			) : (
				<p>{error || "No comments yet."}</p>
			)}

			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size="md"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
						<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
							Are you sure you want to delete this comment?
						</h3>
						<div className="flex justify-between items-center">
							<Button color="failure" onClick={handleDeleteComment}>
								Yes, I&#39;m sure
							</Button>
							<Button color="gray" onClick={() => setShowModal(false)}>
								No, Cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
};

export default DashComment;
