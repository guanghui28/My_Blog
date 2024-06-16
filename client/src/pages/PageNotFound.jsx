import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<section className="h-screen flex items-center justify-center flex-col gap-5">
			<h3 className="font-bold text-4xl">404 Page Not Found 🥲</h3>
			<Link to="/" replace>
				<Button gradientDuoTone="purpleToPink" size="lg">
					Back Home ➡️
				</Button>
			</Link>
		</section>
	);
};

export default PageNotFound;
