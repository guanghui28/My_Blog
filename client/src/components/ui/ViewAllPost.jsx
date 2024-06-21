import { Link } from "react-router-dom";

const ViewAllPost = () => {
	return (
		<Link
			to="/search"
			className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
		>
			View all posts
		</Link>
	);
};

export default ViewAllPost;
