import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop } from '../components/BackDrop';
import Dialog from '../components/Dialog';

export const layoutContext = createContext({});
layoutContext.displayName = 'LayoutContext';

export const Layout = ({ children }) => {
	const [dialog, setDialog] = useState(null);

	return (
		<layoutContext.Provider value={{ dialog, setDialog }}>
			{children}
		</layoutContext.Provider>
	);
};

export const useDialog = () => {
	const { dialog, setDialog } = useContext(layoutContext);

	const openDialog = (element) => setDialog(element);
	const closeDialog = () => setDialog(null);

	return {
		dialog, openDialog, closeDialog
	};
};

export const useLoading = () => {
	const { dialog, openDialog, closeDialog: finishLoading } = useDialog();
	const startLoading = (message) => openDialog(<Dialog>{message}</Dialog>);

	return {
		startLoading,
		finishLoading
	};
}

export const DialogContainer = () => {
	const { dialog } = useDialog();
	return (
		dialog && (
			createPortal(
				<BackDrop>{ dialog }</BackDrop>,
				document.querySelector('#dialog')
			)
		)
	)
};
