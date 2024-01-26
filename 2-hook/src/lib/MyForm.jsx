import { createContext, createElement, useContext, useEffect, useState } from 'react';
import { useForm as useReducerForm } from './MyFormReducer';

export const useForm = ({ initialValues, validate, onSubmit }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState();
	const [touched, setTouched] = useState();

	const handleChange = (e) => {
		const nextValues = {
			...values,
			[e.target.name]: e.target.value
		};
		setValues(nextValues);
	};

	const handleBlur = (e) => {
		const nextTouched = {
			...touched,
			[e.target.name]: true
		};
		setTouched(nextTouched);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const nextTouched = Object.keys(values).reduce((touched, field) => {
			touched[field] = true;
			return touched;
		}, {});
		setTouched(nextTouched);

		const result = validate(values);
		setErrors(result);
		if (Object.values(result).some(Boolean)) return;

		onSubmit(values);
	};

	useEffect(() => {
		setErrors(validate(values));
	}, [values]);

	const getFieldProps = (name) => {
		if (!name) return {};
		return {
			name,
			value: values[name],
			onBlur: handleBlur,
			onChange: handleChange
		}
	};

	return {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldProps
	};

}


const formContext = createContext({});
formContext.displayName = 'FormContext';

export const Form = ({ id, className, children, ...rest }) => {
	debugger;
	const formValue = useReducerForm({ ...rest });
	// const formValue = useForm({ ...rest });
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
