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
		await newUser.save();
		res.status(201).json({ success: true, message: "Sign up successful" });
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

		// remove password
		const { password: pss, ...rest } = validUser._doc;

		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};
