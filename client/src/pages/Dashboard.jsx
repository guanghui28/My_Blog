import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { useEffect, useState } from "react";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComment from "../components/DashComment";
import Statistic from "../components/Statistic";

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
			{/* profile */}
			{tab === "profile" && <DashProfile />}
			{/* posts */}
			{tab === "posts" && <DashPosts />}
			{/* users */}
			{tab === "users" && <DashUsers />}
			{/* comments */}
			{tab === "comments" && <DashComment />}
			{/* statistics */}
			{tab === "statistics" && <Statistic />}
		</div>
	);
};

export default Dashboard;
