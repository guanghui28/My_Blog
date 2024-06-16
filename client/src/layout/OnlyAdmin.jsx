import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdmin = () => {
	const { currentUser } = useSelector((state) => state.user);

	return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default OnlyAdmin;
