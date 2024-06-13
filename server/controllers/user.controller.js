import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
	const { userId } = req.params;
	const { username, password, email, profilePicture } = req.body;

	if (req.user.id !== userId) {
		return next(errorHandler(403, "You're not allowed to update this user!"));
	}

	let hashedPassword;
	if (password) {
		if (password.length < 6) {
			return next(
				errorHandler(400, "Password must be at least 6 characters long.")
			);
		}

		hashedPassword = bcryptjs.hashSync(password, 10);
	}

	if (username) {
		if (username.length < 7 || username.length > 20) {
			return next(
				errorHandler(400, "Username must be between 7 and 20 characters")
			);
		}

		if (username.includes(" ")) {
			return next(errorHandler(400, "Username cannot contain spaces"));
		}

		if (username !== username.toLowerCase()) {
			return next(errorHandler(400, "Username must be lowercase"));
		}

		if (!username.match(/^[a-zA-z0-9]+$/)) {
			return next(
				errorHandler(400, "Username can only contains letters and numbers")
			);
		}
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				$set: {
					username,
					email,
					profilePicture,
					password: hashedPassword,
				},
			},
			{ new: true }
		);
		const { password: pss, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};
