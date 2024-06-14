import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return next(errorHandler(400, "All fields are required!"));
	}

	const hashedPassword = bcryptjs.hashSync(password, 10);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		//TODO: check duplicate username or email
		await newUser.save();
		res.status(201).json({ message: "Sign up successful" });
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(errorHandler(400, "All fields are required!"));
	}
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "Email or Password are incorrect"));
		}

		const isMatchedPassword = bcryptjs.compareSync(
			password,
			validUser.password
		);

		if (!isMatchedPassword) {
			return next(errorHandler(404, "Email or Password are incorrect"));
		}

		// generate token
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
		res.cookie("access_token", token, {
			httpOnly: true,
		});

		// hidden password to client
		const { password: pss, ...rest } = validUser._doc;

		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};

export const google = async (req, res, next) => {
	const { name, email, googlePhotoUrl } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
			const { password, ...rest } = user._doc;
			res.cookie("access_token", token, {
				httpOnly: true,
			});
			return res.status(200).json(rest);
		} else {
			// when user login success then notify user change the password
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
			const newUser = new User({
				username:
					name.toLowerCase().split(" ").join("") +
					Math.random().toString(9).slice(-4),
				email,
				password: hashedPassword,
				profilePicture: googlePhotoUrl,
			});

			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
			const { password, ...rest } = newUser._doc;
			res.cookie("access_token", token, {
				httpOnly: true,
			});
			return res.status(200).json(rest);
		}
	} catch (error) {
		next(error);
	}
};

export const signout = (req, res, next) => {
	try {
		res.clearCookie("access_token");
		res.status(200).json({ message: "User has been sign out" });
	} catch (error) {
		next(error);
	}
};
