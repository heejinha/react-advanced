import { useState } from 'react';

const MyReact = (function MyReact() {
	let firstName;
	let isInitialized = false;

	const useName = (initialValue = '') => {
		const { forceUpdate } = useForceUpdate();
		if (!isInitialized) {
			firstName = initialValue;
			isInitialized = true;
		}

		const setFirstName = value => {
			if (firstName === value) return;
			firstName = value;
			forceUpdate();
		}

		return [firstName, setFirstName];
	};

	function useForceUpdate() {
		const [value, setValue] = useState(1);
		const forceUpdate = () => setValue(value + 1);
		return { forceUpdate };
	}

	return { useName }
})();

export default MyReact;
