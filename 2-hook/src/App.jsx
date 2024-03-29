import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import button from './components/Button';
import { Route, Router, Routes } from './lib/MyRouter';
import { Layout } from './lib/MyLayout';
import { ErrorMessage, Field, Form, useForm } from './lib/MyForm';
import MyReact from './lib/MyReact';
import { useReducer, useState } from 'react';

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

export default App;

const Board = ({ posts, tag }) => {
	MyReact.resetCursor();

	const [darkTheme, setDartTheme] = useState(false);

	const filterPosts = () => {
		return posts.filter((post) => (tag ? post.tag === tag : true));
	};

	const filteredPosts = MyReact.useMemo(filterPosts, [posts, tag]);

	const handleClick = MyReact.useCallback((id) => {
		console.log('click', id);
	}, []);

	console.log('board rendered');

	return (
		<>
			<div>
				<button onClick={() => setDartTheme(!darkTheme)}>테마 변경</button>
				<label htmlFor="">
					{ darkTheme ? '어두움' : '밝음'}
				</label>
			</div>
			<FilteredPosts value={filteredPosts} onClick={handleClick} />
		</>
	)
};

const FilteredPosts = MyReact.memo(({ value, onClick }) => {
	console.log('filtered memo rendered');
	return (
		<ul>
			{
				value.map(({ id, content, tag }) => (
					<li key={id} onClick={() => onClick(id)}>
						{content}
						<span>#{tag}</span>
					</li>
				))
			}
		</ul>
	)

})

// export default () => {
// 	const [tag, setTag] = useState('');
// 	return (
// 		<>
// 			<button onClick={() => setTag('')}>All</button>
// 			<button onClick={() => setTag('tag1')}>tag1</button>
// 			<button onClick={() => setTag('tag2')}>tag2</button>
// 			<Board
// 				posts={[
// 					{ id: 'id1', content: 'content1', tag: 'tag1' },
// 					{ id: 'id2', content: 'content2', tag: 'tag2' },
// 					{ id: 'id3', content: 'content3', tag: 'tag1' },
// 				]}
// 				tag={tag}
// 			/>
// 		</>
// 	)
// }

// const initialState = {
// 	value: { nickname: '', password: ''},
// 	error: { nickname: '', password: ''}
// };

// const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'CHANGE':
// 			return {
// 				...state,
// 				value: {
// 					...state.value,
// 					[action.name]: action.value
// 				}
// 			};
// 		case 'RESET':
// 			return initialState;
// 		case 'VALIDATE':
// 			return {
// 				...state,
// 				error: {
// 					nickname: /^\w+$/.test(state.value.nickname) ? '' : '영문, 숫자만 입력',
// 					password: /^.{3,6}$/.test(state.value.password) ? '' : '3~6글자 입력'
// 				}
// 			};
// 		default:
// 			throw '알 수 없는 액션';
// 	}
// }

// const RegisterForm = () => {
// 	// const { state, handleChange, handleReset, handleSubmit} = useRegisterForm();
// 	const [state, dispatch] = MyReact.useReducer(reducer, initialState);

// 	const handleChange = ({ target }) => dispatch({ type: 'CHANGE', name: target.name, value: target.value });
// 	const handleReset = () => dispatch({ type: 'RESET'});
// 	const handleSubmit = () => dispatch({ type: 'VALIDATE'});

// 	return (
// 		<>
// 			<div>
// 				<label htmlFor="">닉네임 : </label>
// 				<input
// 					type="text"
// 					name="nickname"
// 					value={state.value.nickname}
// 					onChange={handleChange}
// 				/>
// 				<span>{state.error.nickname}</span>
// 			</div>
// 			<div>
// 				<label htmlFor="">비밀번호 : </label>
// 				<input
// 					type="text"
// 					name="password"
// 					value={state.value.password}
// 					onChange={handleChange}
// 				/>
// 				<span>{state.error.password}</span>
// 			</div>
// 			<button onClick={handleReset}>초기화</button>
// 			<button onClick={handleSubmit}>회원가입</button>
// 		</>
// 	);

// };

// export default RegisterForm;


// export default () => {
// 	const validate = (values) => {
// 		const validateResult = {
// 			email: '',
// 			password: ''
// 		};

// 		if (!values.email) validateResult.email = '이메일을 입력하세요.';
// 		if (!values.password) validateResult.password = '비밀번호를 입력하세요.';
// 		return validateResult;
// 	};

// 	const onSubmit = (values) => {
// 		console.log(values);
// 	};

// 	return (
// 		<>
// 			<Form initialValues={{ email: '', password: '' }} validate={validate} onSubmit={onSubmit}>
// 				<Field type="text" name="email" />
// 				<ErrorMessage name="email" />
// 				<Field type="password" name="password" />
// 				<ErrorMessage name="password" />
// 				<button>Login</button>
// 			</Form>
// 		</>
// 	);
// };

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
