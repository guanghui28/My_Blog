import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
	const { theme } = useSelector((state) => state.theme);
	return (
		<div className={theme}>
			<div className="bg-slate-100 text-slate-900 dark:text-slate-100 dark:bg-slate-900 min-h-screen">
				{children}
			</div>
		</div>
	);
};

export default ThemeProvider;
