import { Navigate, Outlet } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser ? (
		<div className="min-h-screen flex flex-col md:flex-row">
			<div className="md:w-56">
				<DashSidebar />
			</div>
			<Outlet />
		</div>
	) : (
		<Navigate to="/sign-in" replace />
	);
};

export default Dashboard;
