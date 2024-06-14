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

export const deleteUser = async (req, res, next) => {
	const { userId } = req.params;

	if (!req.user.isAdmin && userId !== req.user.id) {
		return next(errorHandler(401, "You're not allowed to delete this user"));
	}

	try {
		await User.findByIdAndDelete(userId);
		res.status(200).json({ message: "User has been deleted" });
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(errorHandler(403, "You're not allowed to see all users"));
	}
	try {
		const startIndex = parseInt(req.query.startIndex) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.sort === "asc" ? 1 : -1;

		const users = await User.find()
			.sort({ createdAt: sortDirection })
			.skip(startIndex)
			.limit(limit)
			.select("-password");

		const totalUsers = await User.countDocuments();

		const now = new Date();

		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);

		const lastMonthUsers = await User.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		});

		res.status(200).json({
			users,
			totalUsers,
			lastMonthUsers,
		});
	} catch (error) {
		next(error);
	}
};
