import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	signInStart,
	signInFailure,
	signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { loading, error: errorMessage } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			return dispatch(signInFailure("Please fill out all fields"));
		}
		try {
			dispatch(signInStart());
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			// backend: error -> json({success:false})
			// DON'T: !data.success
			if (data.success === false) {
				return dispatch(signInFailure(data.message));
			}

			if (res.ok) {
				setFormData({
					email: "",
					password: "",
				});
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			dispatch(signInFailure(error.message));
		}
	};

	return (
		<div className="flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5">
			{/* TODO: fix the movement the left when has error */}
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
							placeholder="************"
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
							"Sign In"
						)}
					</Button>
					<OAuth />
				</form>
				<div className="flex gap-2 text-sm mt-5">
					<span>Do not have an account?</span>
					<Link to="/sign-up" className="text-blue-500">
						Sign Up
					</Link>
				</div>

				{errorMessage && (
					<Alert className="mt-5" color="failure">
						{errorMessage}
					</Alert>
				)}
			</div>
		</div>
	);
};

export default SignIn;
