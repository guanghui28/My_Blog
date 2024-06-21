/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const LogoName = ({ size = "4xl" }) => {
	const fontSize = `text-${size}`;
	return (
		<Link
			to="/"
			className={`font-bold self-center whitespace-nowrap text-sm sm:${fontSize}  dark:text-white`}
		>
			<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
				Guanghui's
			</span>
			Blog
		</Link>
	);
};

export default LogoName;
