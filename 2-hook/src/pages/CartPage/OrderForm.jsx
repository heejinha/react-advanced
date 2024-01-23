import { useRef } from 'react';
import FormControl from '../../components/FormControl';
import { ErrorMessage, Field, Form } from '../../lib/MyForm';

const OrderForm = ({ onSubmit }) => {
	const validate = (values) => {
		const errors = {};
		if (!values.deliveryAddress) {
			errors.deliveryAddress = '주소를 입력하세요';
		}

		if (!values.deliveryContact) {
			errors.deliveryContact = '연락처를 입력하세요';
		}

		if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(values.deliveryContact)) {
			errors.deliveryContact = '전화번호 형식으로 입력하세요';
		}
		return errors;
	}

	return (
		<Form
			id="order-form"
			className="OrderForm"
			initialValues={{
				deliveryAddress: '',
				deliveryContact: '',
				paymentMethod:'',
				messageToShop: '',
				messageToRider: ''
			}}
			validate={validate}
			onSubmit={onSubmit}
		>
			<FormControl label="이름" htmlFor="name" required={true}>
				<input type="text" id="name" required />
			</FormControl>
			<FormControl
				label="연락처"
				htmlFor="deliveryContact"
				required={true}
				error={<ErrorMessage name="deliveryContact" />}
			>
				<Field
					type="text"
					name="deliveryContact"
					id="phone"
					placeholder="연락처를 입력하세요"
					pattern="^\d{2,3}-\d{3,4}-\d{4}"
				/>
			</FormControl>
			<FormControl
				label="주소"
				htmlFor="deliveryAddress"
				required
				error={<ErrorMessage name="deliveryAddress" />}
			>
				<Field
					type="text"
					name="deliveryAddress"
					id="deliveryAddress"
					placeholder="배달받을 주소를 입력하세요."
					autoFocus
				/>
			</FormControl>
			<FormControl
				label="결제수단"
				htmlFor="paymentMethod"
				required
			>
				<Field as="select" name="paymentMethod" id="paymentMethod">
					<option value="마이페이">마이페이</option>
					<option value="만나서결제">만나서결제</option>
				</Field>
			</FormControl>
			<FormControl label="가게사장님께" htmlFor="messageToShop">
				<Field as="textarea" name="messageToShop" id="messageToShop" cols="30" rows="3" />
			</FormControl>
			<FormControl label="라이더님께" htmlFor="messageToRider">
				<Field as="textarea" name="messageToRider" id="messageToRider" cols="30" rows="3" />
			</FormControl>
		</Form>
	);
}

export default OrderForm;
