import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { useEffect, useState } from "react";
import DashPosts from "../components/DashPosts";

const Dashboard = () => {
	const { search } = useLocation();
	const [tab, setTab] = useState("");

	useEffect(() => {
		const urlPrams = new URLSearchParams(search);
		const tabFromUrl = urlPrams.get("tab");
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [search]);

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				<DashSidebar />
			</div>
			{tab === "profile" && <DashProfile />}
			{tab === "posts" && <DashPosts />}
		</div>
	);
};

export default Dashboard;
