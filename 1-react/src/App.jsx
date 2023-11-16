import { Component, createRef } from 'react';
import MyReact from './lib/MyReact';
import { Router, Routes, Route } from './lib/MyRouter';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/cart" element={<CartPage />} />
				<Route path="/order" element={<OrderPage />} />
				<Route path="/" element={<ProductPage />} />
			</Routes>
		</Router>
	);
};

export default App;




// MyReact - Context 테스트
const countContext = MyReact.createContext({
	count: 0,
	setCount: () => {}
});

class CountProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0
		}
	}

	render() {
		const value = {
			count: this.state.count,
			setCount: (count) => this.setState({ count })
		}

		return (
			<countContext.Provider value={value}>
				{ this.props.children }
			</countContext.Provider>
		);
	}
}

const Count = () => {
	return (
		<countContext.Consumer>
			{ (value) => (<div>{ value.count }</div>) }
		</countContext.Consumer>
	);
};

const PlusButton = () => {
	return (
		<countContext.Consumer>
			{
				(value) => (
					<button onClick={ () => value.setCount(value.count + 1) }>
						+
					</button>
				)
			}
		</countContext.Consumer>
	);
}

// export default () => (
// 	<CountProvider>
// 		<Count />
// 		<PlusButton />
// 	</CountProvider>
// );




// eventEmitter 테스트
// const eventEmitter = createEventEmitter(0);
// const logger = (value) => console.log(value);
//
// eventEmitter.on(logger);
// console.log(eventEmitter.get());
// eventEmitter.set(1);




// MyComponent 테스트
class Foo extends Component {
	render() {
		return (
			<>Foo</>
		)
	}
}

class MyComponent extends Component {
	divRef = createRef();
	fooRef = createRef();

	constructor(props) {
		super(props);

		console.log('constructor', this.divRef);
	}

	render() {
		console.log('render', this.divRef);
		return (
			<>
				<div ref={this.divRef} />
				<Foo ref={this.fooRef} />
			</>
		)
	}

	componentDidMount() {
		console.log('componentDidMount', this.divRef);
		console.log('componentDidMount', this.fooRef);
		const divElement = this.divRef.current;
		divElement.style.backgroundColor = 'red';
		divElement.style.height = '100px';
		divElement.style.width = '100px';
	}
}
// export default MyComponent;
