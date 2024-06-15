import { Button } from "flowbite-react";

const CallToAction = () => {
	return (
		<div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tf-3xl rounded-br-3xl text-center">
			<div className="flex-1 flex flex-col justify-center">
				<h2 className="text-2xl">Want to learn more about Javascript?</h2>
				<p className="text-gray-500 my-2">
					Checkout these resources with 100 Javascript Projects
				</p>
				<Button
					gradientDuoTone="purpleToPink"
					className="rounded-tl-xl rounded-bl-none"
				>
					<a
						href="https://guanghui.vercel.app/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn more
					</a>
				</Button>
			</div>
			<div className="p-7 flex-1">
				<img
					src="https://cdn.tgdd.vn/hoi-dap/1321801/javascript-la-gi-co-vai-tro-gi-cach-bat-javascript-tren.001.jpg"
					alt="javascript"
				/>
			</div>
		</div>
	);
};

export default CallToAction;
