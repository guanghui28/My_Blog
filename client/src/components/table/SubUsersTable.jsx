import { Table } from "flowbite-react";

const SubUsersTable = ({ users }) => {
	return (
		<Table hoverable>
			<Table.Head>
				<Table.HeadCell>User image</Table.HeadCell>
				<Table.HeadCell>Username</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				{users.length > 0 &&
					users.map((user) => (
						<Table.Row
							key={user._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell>
								<img
									src={user.profilePicture}
									alt={user.username}
									className="w-10 h-10 rounded-full bg-gray-500"
								/>
							</Table.Cell>
							<Table.Cell>{user.username}</Table.Cell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
};

export default SubUsersTable;
