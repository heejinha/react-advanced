import { memo, useState as reactUseState } from 'react';
import createEventEmitter from 'shared/lib/EventEmitter';


const MyReact = (function MyReact() {
	const memorizedStates = [];
	const deps = [];
	const isInitialized = [];
	const cleanups = [];
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

	function useEffect(effect, nextDeps) {
		function runDedeferedEffect(effect) {
			function runEffect(effect) {
				const cleanup = effect();
				if (cleanup) cleanups[cursor] = cleanup;
			}
			const ENOUGH_TIME_TO_RENDER = 1;
			setTimeout(() => runEffect(effect), ENOUGH_TIME_TO_RENDER);
		}

		if (!isInitialized[cursor]) {
			isInitialized[cursor] = true;
			deps[cursor] = nextDeps;
			cursor = cursor + 1;
			runDedeferedEffect(effect);
			return;
		}

		const prevDeps = deps[cursor];
		const depSame = prevDeps.every((prevDep, index) => prevDep === nextDeps[index]);
		if (depSame) {
			cursor = cursor + 1;
			return;
		}
		deps[cursor] = nextDeps;
		cursor = cursor + 1;
		runDedeferedEffect(effect);
	}

	function resetCursor() {
		cursor = 0;
	}

	function cleanupEffects() {
		cleanups.forEach(cleanup => typeof cleanup === 'function' && cleanup())
	}

	const createContext = (initValue) => {
		const emitter = createEventEmitter(initValue);

		function Provider({ value, children }) {
			useEffect(() => {
				emitter.set(value);
			}, [value]);

			return <> { children } </>;
		}
		return { Provider, emitter }
	};

	function useContext(context) {
		const [value, setValue] = useState(context.emitter.get());

		useEffect(() => {
			context.emitter.on(setValue)
			return () => context.emitter.off(setValue());
		}, [context]);

		return value;
	}

	function useRef(initialValue) {
		if (!isInitialized[cursor]) {
			memorizedStates[cursor] = { current: initialValue };
			isInitialized[cursor] = true;
		}
		const memorizedStates = memorizedStates[cursor];
		cursor = cursor + 1;
		return memorizedStates;
	}

	return {
		useState,
		useEffect,
		useRef,
		createContext,
		useContext,
		resetCursor,
		cleanupEffects
	}
})();

export default MyReact;
