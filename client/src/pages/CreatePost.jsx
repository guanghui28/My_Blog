import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { CATEGORIES } from "../data";

const CreatePost = () => {
	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(formData).length === 0) {
			return toast.error("Please fill are the fields before publish");
		}
		try {
			const res = await fetch("/api/post/create-post", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message);
			}

			navigate(`/post/${data.slug}`);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleUploadImage = async () => {
		if (!file) {
			return toast.error("Please select an image!");
		}
		try {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + "-" + file.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setImageUploadProgress(progress.toFixed(0));
				},
				(error) => {
					if (error) {
						toast.error("Image upload failed");
						setImageUploadProgress(null);
					}
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageUploadProgress(null);
						setFormData({ ...formData, image: downloadURL });
						toast.success("Image post upload successfully!");
					});
				}
			);
		} catch (error) {
			setImageUploadProgress(null);
			toast.error(error.message);
		}
	};

	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-center text-3xl my-7 font-semibold">Create A Post</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 sm:flex-row justify-between">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="flex-1"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<Select
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						{CATEGORIES.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</Select>
				</div>
				<div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
					<FileInput
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						type="button"
						gradientDuoTone="purpleToBlue"
						size="sm"
						outline
						onClick={handleUploadImage}
						disabled={imageUploadProgress}
					>
						{imageUploadProgress ? (
							<div className="w-16 h-16">
								<CircularProgressbar
									value={imageUploadProgress}
									text={`${imageUploadProgress || 0}%`}
								/>
							</div>
						) : (
							"Upload Image"
						)}
					</Button>
				</div>

				{formData.image && (
					<img
						src={formData.image}
						alt="upload"
						className="w-full h-72 object-cover"
					/>
				)}

				<ReactQuill
					theme="snow"
					placeholder="Write some description..."
					className="h-72 mb-12"
					required
					onChange={(value) => {
						setFormData({ ...formData, content: value });
					}}
				/>
				<Button type="submit" gradientDuoTone="purpleToPink">
					Publish
				</Button>
			</form>
		</div>
	);
};

export default CreatePost;
