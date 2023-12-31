import { Component, createContext } from 'react';
import { BackDrop } from '../components/BackDrop';
import { getComponentName } from './utils';
import { Dialog } from '../components/Dialog';
import { createPortal } from 'react-dom';

export const layoutContext = createContext({});
layoutContext.displayName = 'LayoutContext';

export class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialog: null,
		}
		this.setDialog = this.setDialog.bind(this);
	}

	setDialog(dialog) {
		this.setState({ dialog });
	}

	render() {
		const value = {
			dialog: this.state.dialog,
			setDialog: this.setDialog
		}

		return (
			<layoutContext.Provider value={value}>
				{this.props.children}
			</layoutContext.Provider>
		)
	}
}

export const withLayout = (WrappedComponent) => {
	const WithLayout = (props) => {
		return (
			<layoutContext.Consumer>
				{
					({ dialog, setDialog }) => {
						const openDialog = setDialog;
						const closeDialog = () => setDialog(null);

						const startLoading = (message) => openDialog(<Dialog>{message}</Dialog>);
						const finishLoading = closeDialog;

						const enhancedProps = {
							dialog,
							openDialog, closeDialog,
							startLoading, finishLoading
						};
						return (
							<WrappedComponent {...props} {...enhancedProps} />
						);
					}
				}
			</layoutContext.Consumer>
		);

	}
	WithLayout.displayName = `WithLayout(${getComponentName(WrappedComponent)})`;
	return WithLayout;
}


export const DialogContainer = withLayout(
	({ dialog }) => (
		dialog && (
			createPortal(
				<BackDrop>{ dialog }</BackDrop>,
				document.querySelector('#dialog')
			)
		)
	)
);
