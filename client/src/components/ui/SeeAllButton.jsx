import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const SeeAllButton = ({ href }) => {
	return (
		<Button outline gradientDuoTone="purpleToPink">
			<Link to={href}>See all</Link>
		</Button>
	);
};

export default SeeAllButton;
