import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import toast from "react-hot-toast";

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.username || !formData.email || !formData.password) {
			return setErrorMessage("Please fill all the fields");
		}
		try {
			setLoading(true);
			setErrorMessage("");
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message);
			}
			setFormData({
				username: "",
				email: "",
				password: "",
			});
			toast.success("Registered successfully. Please Login!");
			navigate("/sign-in");
		} catch (error) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
			{/* left */}
			<div className="flex-1">
				<Link
					to="/"
					className="font-bold self-center whitespace-nowrap text-sm sm:text-4xl  dark:text-white"
				>
					<span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
						Guanghui&apos;s
					</span>
					Blog
				</Link>
				<p className="text-sm mt-5">
					This is my project for learning ReactJs. You can sign up with your
					email and password or with Google.
				</p>
			</div>
			{/* right */}
			<div className="flex-1">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<Label value="Your username" className="text-md md:text-xl" />
						<TextInput
							type="text"
							placeholder="Username"
							id="username"
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<Label value="Your email" className="text-md md:text-xl" />
						<TextInput
							type="email"
							placeholder="example@gm.com"
							id="email"
							onChange={handleOnChange}
						/>
					</div>
					<div>
						<Label value="Your password" className="text-md md:text-xl" />
						<TextInput
							type="password"
							placeholder="Password"
							id="password"
							onChange={handleOnChange}
						/>
					</div>
					<Button
						gradientDuoTone="purpleToPink"
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<>
								<Spinner size="sm" />
								<span className="pl-3">Loading..</span>
							</>
						) : (
							"Sign Up"
						)}
					</Button>
					<OAuth />
				</form>
				<div className="flex gap-2 text-sm mt-5">
					<span>Have an account?</span>
					<Link to="/sign-in" className="text-blue-500">
						Sign In
					</Link>
				</div>

				{errorMessage && (
					<Alert className="mt-5" color="failure">
						{errorMessage}
					</Alert>
				)}
			</div>
		</section>
	);
};

export default SignUp;
