import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteModal from "../ui/DeleteModal";
import toast from "react-hot-toast";
import MainUsersTable from "../table/MainUsersTable";

const DashUsers = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [users, setUsers] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
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
				toast.error(error.message);
			}
		};

		if (currentUser.isAdmin) {
			fetchUsers();
		}
	}, [currentUser._id, currentUser.isAdmin]);

	const handleShowMore = async () => {
		const startIndex = users.length;
		try {
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
			toast.error(error.message);
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
			toast.success("Delete this user successfully!");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setShowModal(false);
			setUserIdToDelete(null);
		}
	};

	return (
		<main className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
			{currentUser.isAdmin && users.length > 0 && (
				<>
					<MainUsersTable
						users={users}
						setShowModal={setShowModal}
						setUserIdToDelete={setUserIdToDelete}
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
