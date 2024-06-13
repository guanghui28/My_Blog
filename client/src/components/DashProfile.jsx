import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
	updateStart,
	updateSuccess,
	updateFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [imageFile, setImageFile] = useState(null);
	const [imageFileUrl, setImageFileUrl] = useState(null);
	const [imageFileUpLoadingProgress, setImageFileUploadingProgress] =
		useState(0);
	const [imageFileUploadError, setImageFileUploadError] = useState(null);
	const [imageFileUploading, setImageFileUploading] = useState(false);
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setUpdateUserError] = useState(null);
	const imgRef = useRef(null);
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		const uploadImage = async () => {
			setImageFileUploading(true);
			setImageFileUploadError(null);
			const storage = getStorage(app);
			const fileName = new Date().getTime() + imageFile.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, imageFile);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setImageFileUploadingProgress(progress.toFixed(0));
				},
				(error) => {
					console.log(error);
					setImageFileUploadError(
						"Could not upload image (file must be less than 2 Mb"
					);
					setImageFileUploadingProgress(0);
					setImageFileUrl(null);
					setImageFile(null);
					setImageFileUploading(false);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageFileUrl(downloadURL);
						setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
						setImageFileUploading(false);
					});
				}
			);
		};
		if (imageFile) {
			uploadImage();
		}
	}, [imageFile]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImageFileUrl(URL.createObjectURL(file));
		}
	};

	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(formData).length === 0) {
			setUpdateUserError("No changes made");
			return;
		}

		try {
			dispatch(updateStart());
			const res = await fetch(`/api/user/upload/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData }),
			});

			const data = await res.json();

			if (!res.ok) {
				dispatch(updateFailure(data.message));
				setUpdateUserError(data.message);
			} else {
				dispatch(updateSuccess(data));
				setUpdateUserSuccess("User's profile updated successfully");
			}
		} catch (error) {
			dispatch(updateFailure(error.message));
			setUpdateUserError(error.message);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					ref={imgRef}
					hidden
					type="file"
					accept="image/*"
					onChange={handleImageChange}
				/>
				<div className="self-center rounded-full w-32 h-32 overflow-hidden cursor-pointer shadow-md relative">
					{imageFileUpLoadingProgress > 0 ? (
						<CircularProgressbar
							value={imageFileUpLoadingProgress || 0}
							text={`${imageFileUpLoadingProgress}%`}
							strokeWidth={5}
							styles={{
								root: {
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 0,
									left: 0,
								},
								path: {
									stroke: `rgba(62, 152, 199, ${
										imageFileUpLoadingProgress / 100
									})`,
								},
							}}
						/>
					) : null}
					<img
						src={imageFileUrl ?? currentUser.profilePicture}
						alt="user"
						className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
							imageFileUpLoadingProgress &&
							imageFileUpLoadingProgress < 100 &&
							"opacity-60"
						}`}
						onClick={() => imgRef.current.click()}
					/>
				</div>
				{imageFileUploadError && (
					<Alert color="failure">{imageFileUploadError}</Alert>
				)}
				<TextInput
					type="text"
					id="username"
					placeholder="username"
					defaultValue={currentUser.username}
					onChange={handleOnChange}
				/>
				<TextInput
					type="email"
					id="email"
					placeholder="email"
					defaultValue={currentUser.email}
					onChange={handleOnChange}
				/>
				<TextInput
					type="password"
					id="password"
					placeholder="***********"
					onChange={handleOnChange}
				/>
				<Button
					type="submit"
					gradientDuoTone="purpleToBlue"
					outline
					disabled={imageFileUploading}
				>
					Update
				</Button>
			</form>

			<div className="text-red-500 flex justify-between mt-2">
				<span className="cursor-pointer">Delete Account</span>
				<span className="cursor-pointer">Sign Out</span>
			</div>

			{updateUserSuccess ? (
				<Alert color="success" className="mt-5">
					{updateUserSuccess}
				</Alert>
			) : null}

			{updateUserError ? (
				<Alert color="failure" className="mt-5">
					{updateUserError}
				</Alert>
			) : null}
		</div>
	);
};

export default DashProfile;
