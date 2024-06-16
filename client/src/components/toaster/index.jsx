import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const ToastSuccess = ({ message }) => {
	return (
		<Toast>
			<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
				<HiCheck className="h-5 w-5" />
			</div>
			<div className="ml-3 text-sm font-normal">{message}</div>
			<Toast.Toggle />
		</Toast>
	);
};

export const ToastError = ({ message }) => {
	<Toast>
		<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
			<HiX className="h-5 w-5" />
		</div>
		<div className="ml-3 text-sm font-normal">{message}</div>
		<Toast.Toggle />
	</Toast>;
};
