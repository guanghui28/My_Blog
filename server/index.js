import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import job from "./utils/cron.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
configDotenv();

const __dirname = path.resolve();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDb is connected");
	})
	.catch((err) => {
		console.log("Error when connect db: ", err.message);
	});

// sending a request every 14 minutes
job.start();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	console.log(err.stack);
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
