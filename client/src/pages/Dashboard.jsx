import { Outlet } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {
	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				<DashSidebar />
			</div>
			<Outlet />
		</div>
	);
};

export default Dashboard;
