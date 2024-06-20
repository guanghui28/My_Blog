import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteModal from "../DeleteModal";

const DashUsers = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [users, setUsers] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);
	const [userIdToDelete, setUserIdToDelete] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setError(null);
				const res = await fetch(`
					/api/user/get-users?sort=asc
				`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.message);
				}
				setUsers(data.users);
				if (data.users.length < 9) {
					setShowMore(false);
				}
			} catch (error) {
				setError(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchUsers();
		}
	}, [currentUser._id, currentUser.isAdmin]);

	const handleShowMore = async () => {
		const startIndex = users.length;
		try {
			setError(null);
			const res = await fetch(
				`/api/user/get-users?sort=asc&startIndex=${startIndex}`
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setUsers((prev) => [...prev, ...data.users]);
			if (data.users.length < 9) {
				setShowMore(false);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const handleDeleteUser = async () => {
		try {
			const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message);
			}
			setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
		} catch (error) {
			console.log(error.message);
		} finally {
			setShowModal(false);
			setUserIdToDelete(null);
		}
	};

	return (
		<main className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && users.length > 0 ? (
				<>
					<Table hoverable className="shadow-md">
						<Table.Head>
							<Table.HeadCell>Date created</Table.HeadCell>
							<Table.HeadCell>User image</Table.HeadCell>
							<Table.HeadCell>Username</Table.HeadCell>
							<Table.HeadCell>Email</Table.HeadCell>
							<Table.HeadCell>Admin</Table.HeadCell>
							<Table.HeadCell>Delete</Table.HeadCell>
						</Table.Head>
						<Table.Body>
							{users.map((user) => (
								<Table.Row
									key={user._id}
									className="divide-y bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell>
										{new Date(user.createdAt).toLocaleDateString()}
									</Table.Cell>
									<Table.Cell>
										<img
											src={user.profilePicture}
											alt={user.username}
											className="w-10 h-10 object-cover bg-gray-500 rounded-full"
										/>
									</Table.Cell>
									<Table.Cell>{user.username}</Table.Cell>
									<Table.Cell>{user.email}</Table.Cell>
									<Table.Cell>
										{user.isAdmin ? (
											<FaCheck className="text-green-500" />
										) : (
											<FaTimes className="text-red-500" />
										)}
									</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true);
												setUserIdToDelete(user._id);
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
				<p>{error || "No users yet."}</p>
			)}

			<DeleteModal
				objectName={"user"}
				showModal={showModal}
				setShowModal={setShowModal}
				handleClick={handleDeleteUser}
			/>
		</main>
	);
};

export default DashUsers;
