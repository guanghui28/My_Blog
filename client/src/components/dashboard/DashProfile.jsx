import { Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
	updateStart,
	updateSuccess,
	updateFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
} from "../../redux/user/userSlice";
import useLogout from "../../hooks/useLogout";
import DeleteModal from "../DeleteModal";
import toast from "react-hot-toast";

const DashProfile = () => {
	const { currentUser, loading } = useSelector((state) => state.user);
	const [imageFile, setImageFile] = useState(null);
	const [imageFileUrl, setImageFileUrl] = useState(null);
	const [imageFileUpLoadingProgress, setImageFileUploadingProgress] =
		useState(0);
	const [imageFileUploading, setImageFileUploading] = useState(false);
	const [formData, setFormData] = useState({});
	const [showModal, setShowModal] = useState(false);

	// Custom hooks
	const { signOut } = useLogout();

	const imgRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const uploadImage = async () => {
			setImageFileUploading(true);
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
					if (error) {
						toast.error("Could not upload image (file must be less than 2 Mb");
					}

					setImageFileUploadingProgress(0);
					setImageFileUrl(null);
					setImageFile(null);
					setImageFileUploading(false);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						toast.success("Upload profile picture success!");
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
			return toast.error("No change was made!");
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
				throw new Error(data.message);
			}
			dispatch(updateSuccess(data));
			toast.success("Your profile updated successfully");
		} catch (error) {
			dispatch(updateFailure(error.message));
			toast.error(error.message);
		}
	};

	const handleDeleteUser = async () => {
		setShowModal(false);
		try {
			dispatch(deleteUserStart());

			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message);
			}
			toast.success("Logged in successfully!");
			dispatch(deleteUserSuccess());
			navigate("/sign-in");
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
			toast.error(error.message);
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
						src={imageFileUrl ?? currentUser?.profilePicture}
						alt="user"
						className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
							imageFileUpLoadingProgress &&
							imageFileUpLoadingProgress < 100 &&
							"opacity-60"
						}`}
						onClick={() => imgRef.current.click()}
					/>
				</div>

				{currentUser && (
					<>
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
							disabled={imageFileUploading || loading}
						>
							{imageFileUploading || loading ? "Updating..." : "Update"}
						</Button>
						{currentUser.isAdmin && (
							<Link to="/create-post">
								<Button
									type="button"
									gradientDuoTone="purpleToPink"
									className="w-full"
								>
									Create a post
								</Button>
							</Link>
						)}
					</>
				)}
			</form>

			<div className="text-red-500 flex justify-between mt-2">
				<span className="cursor-pointer" onClick={() => setShowModal(true)}>
					Delete Account
				</span>
				<span className="cursor-pointer" onClick={signOut}>
					Sign Out
				</span>
			</div>

			<DeleteModal
				handleClick={handleDeleteUser}
				objectName={"account"}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</div>
	);
};

export default DashProfile;
