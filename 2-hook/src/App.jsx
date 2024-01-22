import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import button from './components/Button';
import { Route, Router, Routes } from './lib/MyRouter';
import { Layout } from './lib/MyLayout';
import { ErrorMessage, Field, Form, useForm } from './lib/MyForm';

const App = () => (
	<>
		<Layout>
			<Router>
				<Routes>
					<Route path="/cart" element={<CartPage />} />
					<Route path="/order" element={<OrderPage />} />
					<Route path="/" element={<ProductPage />} />
				</Routes>
			</Router>
		</Layout>
	</>
);

// export default App;


export default () => {
	const validate = (values) => {
		const validateResult = {
			email: '',
			password: ''
		};

		if (!values.email) validateResult.email = '이메일을 입력하세요.';
		if (!values.password) validateResult.password = '비밀번호를 입력하세요.';
		return validateResult;
	};

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<>
			<Form initialValues={{ email: '', password: '' }} validate={validate} onSubmit={onSubmit}>
				<Field type="text" name="email" />
				<ErrorMessage name="email" />
				<Field type="password" name="password" />
				<ErrorMessage name="password" />
				<button>Login</button>
			</Form>
		</>
	);
};

// export default () => {
// 	const [state, setState] = useState(0);
// 	const ref1 = useRef(1);
//
// 	if (state > 2) {
// 		ref1.current = ref1.current + 1;
// 	}
//
// 	return <>
// 		<button onClick={() => setState(state + 1)}>state 증가 {state}</button>
// 		<div>{ref1.current}</div>
// 	</>;
// }
// const countContext = MyReact.createContext({});
// const CountProvider = ({ children }) => {
// 	const [count, setCount] = useState(0);
// 	const value = { count, setCount };
//
// 	return (
// 		<countContext.Provider value={value}>
// 			{children}
// 		</countContext.Provider>
// 	)
// };
//
// const Count = () => {
// 	const { count } = MyReact.useContext(countContext);
// 	return <div>{ count }</div>;
// };
//
// const PlusButton = () => {
// 	const { count, setCount } = MyReact.useContext(countContext);
// 	const handleClick = () => setCount(count + 1);
// 	return <button onClick={handleClick}>카운트 증가</button>
// };
//
// export default () => (
// 	<CountProvider>
// 		<Count />
// 		<PlusButton />
// 	</CountProvider>
// );


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
