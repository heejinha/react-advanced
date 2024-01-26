import { createContext, createElement, useContext, useEffect, useReducer, useState } from 'react';

const getInitialState = (values) => ({
	values,
	errors: {},
	touched: {}
});
const formReducer = (state, action) => {
	if (action.type === 'SET_VALUES') {
		return {
			...state,
			values: {
				...state.value,
				[action.name]: action.value
			}
		};
	}

	if (action.type === 'SET_TOUCHED') {
		return {
			...state,
			touched: {
				...state.touched,
				[action.name]: true
			}
		};
	}

	if (action.type === 'SET_TOUCHED_ALL') {
		return {
			...state,
			touched: Object.keys(state.values).reduce((touched, field) => {
				touched[field] = true;
				return touched;
			}, {})
		};
	}

	if (action.type === 'VALIDATE') {
		return {
			...state,
			errors: action.validate(state.values)
		};
	}
	throw new 'Unknown Error';

};

export const useForm = ({ initialValues, validate, onSubmit }) => {
	const [state, dispatch] = useReducer(formReducer, getInitialState(initialValues));

	const handleChange = ({ target }) => dispatch({ type: 'SET_VALUES', name: target.name, value: target.value });
	const handleBlur = ({ target }) => dispatch({ type: 'SET_TOUCHED', name: target.name });
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch({ type: 'SET_TOUCHED_ALL' });
		// dispatch({ type: 'VALIDATE' });
		formReducer(state, { type: 'VALIDATE', validate });
		if (Object.values(state.result).some(Boolean)) return;

		onSubmit(values);
	};

	useEffect(() => {
		dispatch({ type: 'VALIDATE', validate });
	}, [state.values]);

	const getFieldProps = (name) => {
		if (!name) return {};
		return {
			name,
			value: state.values[name],
			onBlur: handleBlur,
			onChange: handleChange
		}
	};

	return {
		...state,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldProps
	};

}


const formContext = createContext({});
formContext.displayName = 'FormContext';

export const Form = ({ id, className, children, ...rest }) => {
	const formValue = useForm({ ...rest });
	return (
		<formContext.Provider value={formValue}>
			<form noValidate id={id} className={className} onSubmit={formValue.handleSubmit}>
				{children}
			</form>
		</formContext.Provider>
	);
};

export const Field = ({
	as = 'input',
	children,
	...rest
}) => {
	const { getFieldProps } = useContext(formContext);
	return createElement(as, { ...rest, ...getFieldProps(rest.name) }, children);
};

export const ErrorMessage = ({ name }) => {
	const { errors, touched } = useContext(formContext);
	if (!errors || !touched || !touched[name] || !errors[name]) return null;
	return <span>{errors[name]}</span>;
};
