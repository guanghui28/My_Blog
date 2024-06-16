import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import DashProfile from "./components/DashProfile";
import DashPosts from "./components/DashPosts";
import DashUsers from "./components/DashUsers";
import DashComment from "./components/DashComment";
import DashStatistic from "./components/DashStatistic";

const App = () => {
	return (
		<>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<DashProfile />} />
					<Route path="posts" element={<DashPosts />} />
					<Route path="users" element={<DashUsers />} />
					<Route path="comments" element={<DashComment />} />
					<Route path="statistics" element={<DashStatistic />} />
				</Route>
				<Route element={<AdminRoute />}>
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:postId" element={<UpdatePost />} />
				</Route>

				<Route path="/post/:postSlug" element={<PostPage />} />
				<Route path="/projects" element={<Projects />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
