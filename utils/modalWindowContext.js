import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function useModalContext() {
	return useContext(ModalContext);
}

export function ModalContextProvider({ children }) {
	const [modalMessage, setModalMessage] = useState("");

	const showModalMessagePopup = (message) => {
		setModalMessage(message);
	};

	const hideMOdalMessagePopup = () => {
		setModalMessage("");
	};

	return (
		<ModalContext.Provider
			value={{
				modalMessage,
				showModalMessagePopup,
				hideMOdalMessagePopup,
			}}>
			{children}
		</ModalContext.Provider>
	);
}
