import createEventEmitter from 'shared/lib/EventEmitter';
import { Component } from 'react';

const MyReact = (() => {
	const createContext = (initValue) => {
		const emitter = createEventEmitter(initValue);

		class Provider extends Component {
			constructor(props) {
				super(props);
			}

			componentDidMount() {
				emitter.set(this.props.value);
			}

			componentDidUpdate() {
				emitter.set(this.props.value);
			}

			render() {
				return (
					<> { this.props.children } </>
				);
			}
		}

		class Consumer extends Component {
			constructor(props) {
				super(props);
				this.state = {
					value: emitter.get()
				}

				this.setValue = this.setValue.bind(this);
			}

			setValue(value) {
				this.setState({ value })
			}

			componentDidMount() {
				emitter.on(this.setValue);
			}

			componentWillUnmount() {
				emitter.off(this.setValue);
			}

			render() {
				return (
					<> { this.props.children(this.state.value) } </>
				);
			}
		}

		return {
			Provider, Consumer
		}
	};

	return { createContext };
})();

export default MyReact;
