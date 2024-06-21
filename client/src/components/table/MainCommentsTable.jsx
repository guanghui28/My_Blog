import { Table } from "flowbite-react";

const MainCommentsTable = ({
	comments,
	setShowModal,
	setCommentIdToDelete,
}) => {
	return (
		<Table hoverable className="shadow-md">
			<Table.Head>
				<Table.HeadCell>Date updated</Table.HeadCell>
				<Table.HeadCell>Comment content</Table.HeadCell>
				<Table.HeadCell>Number of likes</Table.HeadCell>
				<Table.HeadCell>Post Id</Table.HeadCell>
				<Table.HeadCell>User Id</Table.HeadCell>
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
						<Table.Cell>
							<p className="truncate">{comment.postId.slice(0, 10)}...</p>
						</Table.Cell>
						<Table.Cell>
							<p className="truncate">{comment.userId.slice(0, 10)}...</p>
						</Table.Cell>
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
	);
};

export default MainCommentsTable;
