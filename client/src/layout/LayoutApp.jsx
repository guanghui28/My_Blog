import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

const LayoutApp = () => {
	useScrollToTop();

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default LayoutApp;
