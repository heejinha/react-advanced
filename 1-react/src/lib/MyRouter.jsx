import { Component, createContext } from 'react';
import OrderPage from '../pages/OrderPage';
import CartPage from '../pages/CartPage';
import ProductPage from '../pages/ProductPage';

const routerContext = createContext({});
routerContext.displayName = 'RouterContext';

const Link = ({ to, ...rest }) =>(
	<routerContext.Consumer>
		{
			({ path, changePath}) => {
				const handleClick = (e) => {
					e.preventDefault();
					if (to !== path) changePath(to);
				}
				return <a {...rest} href={to} onClick={handleClick} />;
			}
		}
	</routerContext.Consumer>
);

class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {
			path: window.location.pathname
		}

		this.handleChangePath = this.handleChangePath.bind(this);
	}

	handleChangePath(path) {
		this.setState({ path });
	}

	render() {
		const contextValue = {
			path: this.state.path,
			changePath: this.handleChangePath
		}

		return (
			<routerContext.Provider value={contextValue}>
				{ this.props.children }
			</routerContext.Provider>
		)
	}
}

const Routes = () => (
	<routerContext.Consumer>
		{
			({ path }) => (
				<>
					{ path === '/order' && <OrderPage /> }
					{ path === '/cart' && <CartPage /> }
					{ !['/cart', '/order'].includes(path) && <ProductPage /> }
				</>
			)
		}
	</routerContext.Consumer>
);

export {
	routerContext,
	Router,
	Routes,
	Link
}
