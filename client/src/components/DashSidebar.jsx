import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
	const { search } = useLocation();
	const [tab, setTab] = useState("");
	const dispatch = useDispatch();

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
				<Sidebar.ItemGroup>
					<Link to="/dashboard?tab=profile">
						<Sidebar.Item
							active={tab === "profile"}
							icon={HiUser}
							label={"User"}
							labelColor="dark"
							as="span"
						>
							Profile
						</Sidebar.Item>
					</Link>
					<Sidebar.Item
						icon={HiArrowSmRight}
						className="cursor-pointer"
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
