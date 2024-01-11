import { Children, createContext, Fragment, isValidElement, useContext, useEffect, useState } from 'react';

const routerContext = createContext({});
routerContext.displayName = 'RouterContext';

export const Router = ({ children }) => {
	const [path, setPath] = useState(window.location.pathname);

	const changePath = (path) => {
		setPath(path);
		window.history.pushState({ path }, '', path);
	}

	const handleOnPopState = (event) => {
		const nextPath = event.state && event.state.path;
		if (!nextPath) return;
		setPath(nextPath);
	}

	useEffect(() => {
		window.addEventListener('popstate', changePath);
		window.history.replaceState({ path }, '');
		return () => window.removeEventListener('popstate', handleOnPopState);
	}, [path]);

	return (
		<routerContext.Provider value={{ path, changePath }}>
			{ children }
		</routerContext.Provider>
	);
}

export const Routes = ({ children }) => {
	const { path } = useContext(routerContext);

	// 반환할 리액트 엘리먼트다
	let element = null;
	Children.forEach(children, child => {
		// 리액트 엘리먼트인지 검사한다
		if (!isValidElement(child)) return;

		// 프레그먼트인지 검사한다
		if (child.type === Fragment) return;

		const { path: childPath, element: childElement } = child.props;

		// Route 컴포넌트인지 검사한다.
		if (!childPath || !childElement) return;

		// Route 에 등록된 컴포넌트가 요청한 경로에 해당하는 건지 검사한다.
		if (childPath !== path.replace(/\?.*$/, '')) return;
		// 엘리먼트를 찾았다
		element = childElement
	})
	return element;
}

export const Route = () => null;

export const Link = ({ to, ...rest }) => {
	const { path, changePath} = useContext(routerContext);
	const handleClick = (e) => {
		e.preventDefault();
		if (to !== path) changePath(to);
	}
	return <a {...rest} href={to} onClick={handleClick} />;
};

export const useNavigate = () => {
	const { path, changePath } = useContext(routerContext);
	const navigate = (nextPath) => {
		if (path !== nextPath) changePath(nextPath);
	}
	return navigate;
};

export const useMatch = () => {
	const { path, changePath } = useContext(routerContext);
	const match = (comparePath) => path === comparePath;
	return match;
};

export const useParams = () => {
	// TODO useMemo 적용
	const queryParams = new URLSearchParams(window.location.search);
	const paramsObject = {};
	for (const [key, value] of queryParams) {
		paramsObject[key] = value;
	}
	return paramsObject;
};
