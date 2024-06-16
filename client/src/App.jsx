import { Route, Routes } from "react-router-dom";
import {
	Home,
	Projects,
	SignUp,
	SignIn,
	About,
	Dashboard,
	CreatePost,
	UpdatePost,
	PostPage,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
	DashProfile,
	DashPosts,
	DashUsers,
	DashStatistic,
	DashComment,
} from "./components/dashboard";
import AdminRoute from "./components/AdminRoute";

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
