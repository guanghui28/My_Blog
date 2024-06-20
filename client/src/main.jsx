import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./context/ThemeProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PersistGate persistor={persistor}>
			<Provider store={store}>
				<ThemeProvider>
					<BrowserRouter>
						<App />
						<Toaster
							position="bottom-center"
							toastOptions={{
								duration: 5000,
							}}
						/>
					</BrowserRouter>
				</ThemeProvider>
			</Provider>
		</PersistGate>
	</React.StrictMode>
);
