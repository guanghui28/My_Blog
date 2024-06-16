import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useState } from "react";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const signOut = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetch("/api/auth/signout", {
				method: "POST",
			});
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message);
			}
			dispatch(signOutSuccess());
			navigate("/sign-in", { replace: true });
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { signOut, loading, error };
};

export default useLogout;
