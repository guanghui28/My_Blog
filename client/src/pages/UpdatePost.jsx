import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [imageUploadError, setImageUploadError] = useState(null);
	const [formData, setFormData] = useState({});
	const [publishError, setPublishError] = useState(null);
	const { postId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		try {
			const fetchPost = async () => {
				const res = await fetch(`/api/post/get-posts?postId=${postId}`);
				const data = await res.json();

				if (!res.ok) {
					setPublishError(data.message);
				} else {
					setFormData(data.posts[0]);
					setPublishError(null);
				}
			};
			fetchPost();
		} catch (error) {
			setPublishError(error.message);
		}
	}, [postId]);

	const handleSubmit = async (e) => {
		setPublishError(null);
		e.preventDefault();
		if (Object.keys(formData).length === 0) {
			setPublishError("Please fill are the fields before publish");
			return;
		}
		try {
			const res = await fetch(
				`/api/post/update-post/${postId}/${currentUser._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...formData }),
				}
			);

			const data = await res.json();

			if (!res.ok) {
				setPublishError(data.message);
				return;
			}

			navigate(`/post/${data.slug}`);
		} catch (error) {
			setPublishError(error.message);
		}
	};

	const handleUploadImage = async () => {
		if (!file) {
			setImageUploadError("Please select an image!");
			return;
		}
		try {
			setImageUploadError(null);
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
					console.log(error);
					setImageUploadError("Image upload failed");
					setImageUploadProgress(null);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageUploadError(null);
						setImageUploadProgress(null);
						setFormData({ ...formData, image: downloadURL });
					});
				}
			);
		} catch (error) {
			setImageUploadProgress(null);
			setImageUploadError(error.message);
		}
	};

	return (
		<section className="p-3 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
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
						value={formData.title}
					/>
					<Select
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
						value={formData.category}
					>
						<option value="uncategorized">Select a category</option>
						<option value="book">Book</option>
						<option value="programming">Programming</option>
						<option value="life">Life</option>
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
				{imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
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
					value={formData.content}
				/>
				<Button type="submit" gradientDuoTone="purpleToPink">
					Update
				</Button>
				{publishError && <Alert color="failure">{publishError}</Alert>}
			</form>
		</section>
	);
};

export default UpdatePost;
