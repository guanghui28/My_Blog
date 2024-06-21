import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const MainPostsTable = ({ posts, setShowModal, setPostIdToDelete }) => {
	return (
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
				{posts.map((post) => (
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
	);
};

export default MainPostsTable;
