import { useState as reactUseState } from 'react';

const MyReact = (function MyReact() {
	const memorizedStates = [];
	const isInitialized = [];
	let cursor = 0;

	const useState = (initialValue = '') => {
		const { forceUpdate } = useForceUpdate();
		if (!isInitialized[cursor]) {
			memorizedStates[cursor] = initialValue;
			isInitialized[cursor] = true;
		}

		const state = memorizedStates[cursor];
		const setStateAt = (_cursor) => (nextState) => {
			if (state === nextState) return;
			memorizedStates[_cursor] = nextState;
			forceUpdate();
		}
		const setState = setStateAt(cursor);
		cursor += 1;
		return [state, setState];
	};

	function useForceUpdate() {
		const [value, setValue] = reactUseState(1);
		const forceUpdate = () => {
			setValue(value + 1);
			cursor = 0;
		}
		return { forceUpdate };
	}

	return { useState }
})();

export default MyReact;
