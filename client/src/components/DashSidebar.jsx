import { Sidebar } from "flowbite-react";
// import { useEffect, useState } from "react";
import {
	HiAnnotation,
	HiArrowSmRight,
	HiChartPie,
	HiDocumentText,
	HiOutlineUserGroup,
	HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

const DashSidebar = () => {
	const { pathname } = useLocation();
	const segment = pathname.split("/")[2];

	const { signOut } = useLogout();
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Sidebar className="w-full md:w-56">
			<Sidebar.Items>
				<Sidebar.ItemGroup className="flex flex-col gap-1">
					<Link to="/dashboard">
						<Sidebar.Item
							active={segment === undefined}
							icon={HiUser}
							label={currentUser?.isAdmin ? "Admin" : "User"}
							labelColor="dark"
							as="span"
						>
							Profile
						</Sidebar.Item>
					</Link>
					{currentUser?.isAdmin ? (
						<>
							<Link to="/dashboard/posts">
								<Sidebar.Item
									active={segment === "posts"}
									icon={HiDocumentText}
									className="cursor-pointer"
									as="span"
								>
									Posts
								</Sidebar.Item>
							</Link>
							<Link to="/dashboard/users">
								<Sidebar.Item
									active={segment === "users"}
									icon={HiOutlineUserGroup}
									className="cursor-pointer"
									as="span"
								>
									Users
								</Sidebar.Item>
							</Link>
							<Link to="/dashboard/comments">
								<Sidebar.Item
									active={segment === "comments"}
									icon={HiAnnotation}
									className="cursor-pointer"
									as="span"
								>
									Comments
								</Sidebar.Item>
							</Link>
							<Link to="/dashboard/statistics">
								<Sidebar.Item
									active={segment === "statistics"}
									icon={HiChartPie}
									className="cursor-pointer"
									as="span"
								>
									Statistics
								</Sidebar.Item>
							</Link>
						</>
					) : null}

					<Sidebar.Item
						icon={HiArrowSmRight}
						className="cursor-pointer mt-auto"
						onClick={signOut}
					>
						Sign Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
};

export default DashSidebar;
