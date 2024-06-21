import { Footer } from "flowbite-react";
import {
	BsFacebook,
	BsInstagram,
	BsTwitter,
	BsGithub,
	BsDribbble,
} from "react-icons/bs";
import LogoName from "./ui/LogoName";

const FooterComponent = () => {
	return (
		<Footer container className="border border-t-8 border-teal-500">
			<div className="w-full max-w-7xl mx-auto">
				<div className="grid w-full justify-between sm:flex  md:grid-cols-1">
					<div className="mt-5">
						<LogoName size="xl" />
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:mt-4 sm:gap-6">
						<div>
							<Footer.Title title="About" />
							<Footer.LinkGroup col>
								<Footer.Link
									href="/about"
									target="_blank"
									rel="noopener noreferrer"
								>
									Guanghui&apos;s Blog
								</Footer.Link>
								<Footer.Link
									href="https://guanghui.vercel.app"
									target="_blank"
									rel="noopener noreferrer"
								>
									My Website
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Follow Me" />
							<Footer.LinkGroup col>
								<Footer.Link
									href="https://github.com/guanghui28"
									target="_blank"
									rel="noopener noreferrer"
								>
									Github
								</Footer.Link>
								<Footer.Link
									href="https://www.instagram.com/guanghuijs/"
									target="_blank"
									rel="noopener noreferrer"
								>
									Instagram
								</Footer.Link>
								<Footer.Link
									href="mailto:phamquanghuy2809@gmail.com"
									rel="noopener noreferrer"
								>
									Contact me
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Legal" />
							<Footer.LinkGroup col>
								<Footer.Link href="#" target="_blank" rel="noopener noreferrer">
									Privacy
								</Footer.Link>
								<Footer.Link href="#" target="_blank" rel="noopener noreferrer">
									Terms & conditions.
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<Footer.Copyright
						href="#"
						by="GuangHui's blog"
						year={new Date().getFullYear()}
					/>
					<div className="mt-2 flex gap-2 sm:justify-center">
						<Footer.Icon href="#" icon={BsFacebook} />
						<Footer.Icon href="#" icon={BsInstagram} />
						<Footer.Icon href="#" icon={BsTwitter} />
						<Footer.Icon href="#" icon={BsGithub} />
						<Footer.Icon href="#" icon={BsDribbble} />
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterComponent;
