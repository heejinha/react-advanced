import { Component, createRef } from 'react';

export class Dialog extends Component {
	constructor(props) {
		super(props);
		this.footerRef = createRef();
	}

	componentDidMount() {
		if (!this.footerRef.current) return;

		const buttons = Array.from(this.footerRef.current.querySelectorAll('button'));
		if (buttons.length === 0) return;
		const activeButton = buttons[buttons.length - 1]
		activeButton.focus();
	}

	render() {
		const { header, children, footer} = this.props;
		return (
			<div className="Dialog">
				{ header && <header>{header}</header>}
				<main>{ children }</main>
				{ footer && <footer ref={this.footerRef}>{footer}</footer> }
			</div>
		);
	}

}
