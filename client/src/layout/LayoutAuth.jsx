import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
	return (
		<main className="h-screen w-ful flex justify-center items-center">
			<Outlet />
		</main>
	);
};

export default LayoutAuth;
