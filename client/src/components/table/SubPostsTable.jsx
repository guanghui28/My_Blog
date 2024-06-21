import { Table } from "flowbite-react";

const SubPostsTable = ({ posts }) => {
	return (
		<Table hoverable>
			<Table.Head>
				<Table.HeadCell>Post</Table.HeadCell>
				<Table.HeadCell>Title</Table.HeadCell>
				<Table.HeadCell>Category</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				{posts.length > 0 &&
					posts.map((post) => (
						<Table.Row
							key={post._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell>
								<img
									src={post.image}
									alt={post.title}
									className="w-14 h-10 rounded-md bg-gray-500 object-cover"
								/>
							</Table.Cell>
							<Table.Cell className="w-96">{post.title}</Table.Cell>
							<Table.Cell>{post.category}</Table.Cell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
};

export default SubPostsTable;
