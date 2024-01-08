import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

const App = () => <><OrderPage /></>;

export default App;


// import { useState } from 'react';
// import MyReact from './lib/MyReact';
//
// const Counter = () => {
// 	MyReact.resetCursor();
//
// 	const [count, setCount] = useState(0);
// 	const [name, setName] = useState(localStorage.getItem('name') || '');
//
// 	const handleClick = () => setCount(count + 1);
// 	const handleChangeName = (e) => setName(e.target.value);
//
// 	MyReact.useEffect(() => {
// 		document.title = `count: ${count}`;
// 		console.log('effect 1');
//
// 		return function cleanup() {
// 			document.title = '';
// 			console.log('effect1 cleanup');
// 		}
// 	}, [count, name]);
//
// 	MyReact.useEffect(() => {
// 		localStorage.setItem('name', name);
// 		console.log('effect 2')
// 	}, [name]);
//
// 	MyReact.useEffect(() => {
// 		setName(localStorage.getItem('name') || '');
// 		console.log('effect 3');
// 	}, []);
//
// 	console.log('counter rendered');
// 	return (
// 		<>
// 			<button onClick={handleClick}>더하기</button>
// 			<input value={name} onChange={handleChangeName}/>
// 		</>
// 	);
// }
// export default () => {
// 	const [mounted, setMounted] = useState(false);
// 	const handleToggle = () => {
// 		const nextMounted = !mounted;
// 		if (!nextMounted) MyReact.cleanupEffects();
// 		setMounted(nextMounted);
// 	};
//
// 	return <>
// 		<button onClick={handleToggle}>component toggle</button>
// 		{ mounted && <Counter /> }
// 	</>;
//
// };

//
// function NameField() {
// 	const [firstName, setFirstName] = MyReact.useState('hehe');
// 	const [lastName, setLastName] = MyReact.useState('ha');
// 	const [age, setAge] = MyReact.useState(20);
// 	return (
// 		<>
// 			<input value={firstName} onChange={({ target }) => setFirstName(target.value)} />
// 			<input value={lastName} onChange={({ target }) => setLastName(target.value)} />
// 			<input value={age} onChange={({ target }) => setAge(target.value)} />
// 		</>
// 	)
// }
//
// export default () => <NameField />;

// function Contract(props) {
// 	const sign = () => {
// 		setTimeout(() => console.log(props.name), 3000);
// 	}
// 	return <button onClick={sign}>sign</button>
// }
//
// class App extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			name: 'user1'
// 		}
// 	}
// 	handleChange(e) {
// 		this.setState({
// 			name: e.target.value
// 		})
// 	}
//
// 	render() {
// 		return (
// 			<>
// 				<select value={this.state.name} onChange={this.handleChange.bind(this)}>
// 					<option value="user1">user1</option>
// 					<option value="user2">user2</option>
// 				</select>
// 				<Contract name={this.state.name} />
// 			</>
// 		);
// 	}
// }
// export default App;

// const contract = new Contract('user1');
// contract.sign();
// contract.name = 'user 2';
//
// function createContract(name) {
// 	const sign = () => {
// 		setTimeout(() => console.log(name), 3000);
// 	}
// 	return {
// 		sign
// 	}
// }
//
// const contract2 = createContract('user3');
// contract2.sign();
