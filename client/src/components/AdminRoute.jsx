import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser && currentUser.isAdmin ? (
		<Outlet />
	) : (
		<Navigate to="/sign-in" replace />
	);
};

export default AdminRoute;
