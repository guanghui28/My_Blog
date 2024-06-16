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

import {
	DashProfile,
	DashPosts,
	DashUsers,
	DashStatistic,
	DashComment,
} from "./components/dashboard";
import OnlyAdmin from "./layout/OnlyAdmin";
import LayoutApp from "./layout/LayoutApp";
import LayoutAuth from "./layout/LayoutAuth";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
	return (
		<>
			<Routes>
				{/* PUBLIC */}
				<Route element={<LayoutAuth />}>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Route>

				<Route element={<LayoutApp />}>
					{/* PUBLIC */}
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />

					{/* only user has logged in */}
					<Route path="/dashboard" element={<Dashboard />}>
						<Route index element={<DashProfile />} />

						{/* only for admin role */}
						<Route element={<OnlyAdmin />}>
							<Route path="posts" element={<DashPosts />} />
							<Route path="users" element={<DashUsers />} />
							<Route path="comments" element={<DashComment />} />
							<Route path="statistics" element={<DashStatistic />} />
						</Route>
					</Route>

					{/* only for admin role */}
					<Route element={<OnlyAdmin />}>
						<Route path="/create-post" element={<CreatePost />} />
						<Route path="/update-post/:postId" element={<UpdatePost />} />
					</Route>

					{/* PUBLIC */}
					<Route path="/post/:postSlug" element={<PostPage />} />
					<Route path="/projects" element={<Projects />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
};

export default App;
