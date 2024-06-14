import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
	HiArrowSmRight,
	HiDocumentText,
	HiOutlineUserGroup,
	HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
	const { search } = useLocation();
	const [tab, setTab] = useState("");
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);

	const handleSignOut = async () => {
		try {
			const res = await fetch("/api/auth/signout", {
				method: "POST",
			});
			const data = await res.json();

			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signOutSuccess());
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const urlPrams = new URLSearchParams(search);
		const tabFromUrl = urlPrams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [search]);

	return (
		<Sidebar className="w-full md:w-56">
			<Sidebar.Items>
				<Sidebar.ItemGroup className="flex flex-col gap-1">
					<Link to="/dashboard?tab=profile">
						<Sidebar.Item
							active={tab === "profile"}
							icon={HiUser}
							label={currentUser.isAdmin ? "Admin" : "User"}
							labelColor="dark"
							as="span"
						>
							Profile
						</Sidebar.Item>
					</Link>
					{currentUser.isAdmin ? (
						<Link to="/dashboard?tab=posts">
							<Sidebar.Item
								active={tab === "posts"}
								icon={HiDocumentText}
								className="cursor-pointer"
								as="span"
							>
								Posts
							</Sidebar.Item>
						</Link>
					) : null}

					{currentUser.isAdmin ? (
						<Link to="/dashboard?tab=users">
							<Sidebar.Item
								active={tab === "users"}
								icon={HiOutlineUserGroup}
								className="cursor-pointer"
								as="span"
							>
								Users
							</Sidebar.Item>
						</Link>
					) : null}

					<Sidebar.Item
						icon={HiArrowSmRight}
						className="cursor-pointer mt-auto"
						onClick={handleSignOut}
					>
						Sign Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
};

export default DashSidebar;
