import ScrollToTop from "../components/ScrollToTop";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const LayoutApp = () => {
	return (
		<>
			<ScrollToTop />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default LayoutApp;
