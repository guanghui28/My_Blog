import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [imageFile, setImageFile] = useState(null);
	const [imageFileUrl, setImageFileUrl] = useState(null);
	const [imageFileUpLoadingProgress, setImageFileUploadingProgress] =
		useState(0);
	const [imageFileUploadError, setImageFileUploadError] = useState(null);
	const imgRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImageFileUrl(URL.createObjectURL(file));
		}
	};

	useEffect(() => {
		const uploadImage = async () => {
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
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageFileUrl(downloadURL);
					});
				}
			);
		};

		if (imageFile) {
			uploadImage();
		}
	}, [imageFile]);

	return (
		<div className="max-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
			<form className="flex flex-col gap-4">
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
				/>
				<TextInput
					type="email"
					id="email"
					placeholder="email"
					defaultValue={currentUser.email}
				/>
				<TextInput type="password" id="password" placeholder="***********" />
				<Button type="submit" gradientDuoTone="purpleToBlue" outline>
					Update
				</Button>
			</form>

			<div className="text-red-500 flex justify-between mt-2">
				<span className="cursor-pointer">Delete Account</span>
				<span className="cursor-pointer">Sign Out</span>
			</div>
		</div>
	);
};

export default DashProfile;
