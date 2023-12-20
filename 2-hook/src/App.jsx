// const App = () => <>2-hook</>;

// export default App;

import MyReact from './lib/MyReact';

function NameField() {
	const [firstName, setFirstName] = MyReact.useState('hehe');
	const [lastName, setLastName] = MyReact.useState('ha');
	const [age, setAge] = MyReact.useState(20);
	return (
		<>
			<input value={firstName} onChange={({ target }) => setFirstName(target.value)} />
			<input value={lastName} onChange={({ target }) => setLastName(target.value)} />
			<input value={age} onChange={({ target }) => setAge(target.value)} />
		</>
	)
}

export default () => <NameField />;

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
