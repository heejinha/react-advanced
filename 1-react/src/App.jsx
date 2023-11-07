import { Component, createRef } from 'react';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';

const App = () => (
	<>
		{/*<ProductPage />*/}
		{/*<OrderPage />*/}
		<CartPage />
	</>
);

export default App;



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
