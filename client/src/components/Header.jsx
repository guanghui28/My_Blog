import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import LogoName from "./ui/LogoName";

const Header = () => {
	const { pathname, search } = useLocation();
	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.theme);
	const [searchTerm, setSearchTerm] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { signOut } = useLogout();

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(search);
		const searchTermFromUrl = urlParams.get("searchTerm");

		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [search]);

	return (
		<Navbar className="border-b-2">
			<LogoName size="xl" />
			<form className="hidden lg:inline" onSubmit={handleSubmitSearch}>
				<TextInput
					type="text"
					placeholder="Search..."
					rightIcon={AiOutlineSearch}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
			<Button className="w-12 h-10 lg:hidden" color="gray" pill>
				<AiOutlineSearch />
			</Button>

			<div className="flex gap-2 md:order-2">
				<Button
					className="w-12 h-10 hidden sm:inline"
					color="gray"
					pill
					onClick={() => dispatch(toggleTheme())}
				>
					{theme === "light" ? <FaMoon /> : <FaSun />}
				</Button>

				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt="user avatar"
								img={currentUser.profilePicture}
								rounded
							/>
						}
					>
						<Dropdown.Header>
							<span className="block text-sm">@{currentUser.username}</span>
							<span className="block text-sm font-medium truncate">
								{currentUser.email}
							</span>
						</Dropdown.Header>
						<Link to="/dashboard">
							<Dropdown.Item>Profile</Dropdown.Item>
						</Link>
						<Dropdown.Divider />
						<Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
					</Dropdown>
				) : (
					<Link to="/sign-in">
						<Button gradientDuoTone="purpleToBlue">Sign In</Button>
					</Link>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link active={pathname === "/"} as="div">
					<Link to="/">Home</Link>
				</Navbar.Link>
				<Navbar.Link active={pathname === "/about"} as="div">
					<Link to="/about">About</Link>
				</Navbar.Link>
				<Navbar.Link active={pathname === "/projects"} as="div">
					<Link to="/projects">Projects</Link>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
