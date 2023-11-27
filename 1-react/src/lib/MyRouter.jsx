import { Children, Component, createContext, Fragment, isValidElement } from 'react';
import { getComponentName } from './utils';

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
		this.handleOnPopState = this.handleOnPopState.bind(this);
	}

	handleChangePath(path) {
		this.setState({ path });
		window.history.pushState({ path }, '', path);
	}

	handleOnPopState(event) {
		const nextPath = event.state && event.state.path;
		if (!nextPath) return;
		this.setState({ path: nextPath });
	}

	componentDidMount() {
		window.addEventListener('popstate', this.handleOnPopState);
		window.history.replaceState({ path: this.state.path }, '');
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.handleOnPopState);
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

const Routes = ({ children }) => {
	return (
		<routerContext.Consumer>
			{
				({ path: inputPath }) => {
					let selectedRoute = null;
					Children.forEach(children, child => {
						if (!isValidElement(child)) return;
						if (child.type === Fragment) return;

						const { path, element } = child.props;
						if (!path || !element) return;
						if (path !== inputPath.replace(/\?.*$/, '')) return;

						selectedRoute = element;
					});
					return selectedRoute;
				}
			}
		</routerContext.Consumer>
	)
};

const Route = () => null;

const withRouter = (WrappedComponent) => {
	const WithRouter = (props) => {
		return (
			<routerContext.Consumer>
				{
					({ path, changePath }) => {
						const navigate = (nextPath) => {
							if (path !== nextPath) changePath(nextPath);
						}
						const enhancedProps = { navigate };
						return <WrappedComponent {...props} {...enhancedProps} />
					}
				}
			</routerContext.Consumer>
		)
	}

	WithRouter.displayName = `WithRouter(${ getComponentName(WrappedComponent)})`
	return WithRouter;
};

export {
	routerContext,
	Router,
	Routes,
	Route,
	Link,
	withRouter
}

