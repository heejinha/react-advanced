import { useRef } from 'react';
import FormControl from '../../components/FormControl';

const OrderForm = ({ onSubmit }) => {
	const formRef = useRef();

	const getInputValueByName = (name) => {
		if (!formRef.current) return;

		const inputElement = formRef.current.elements.namedItem(name);
		if (!inputElement) return '';
		return inputElement.value;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const name = getInputValueByName('name');
		const deliveryContact = getInputValueByName('deliveryContact');
		const deliveryAddress = getInputValueByName('deliveryAddress');
		const paymentMethod = getInputValueByName('paymentMethod');
		const messageToShop = getInputValueByName('messageToShop');
		const messageToRider = getInputValueByName('messageToRider');

		onSubmit({
			name,
			deliveryContact,
			deliveryAddress,
			paymentMethod,
			messageToShop,
			messageToRider
		})
	}

	return (
		<form id="order-form" className="OrderForm"
		      ref={formRef}
		      onSubmit={handleSubmit}>
			<FormControl label="이름" htmlFor="name" required={true}>
				<input type="text" id="name" required />
			</FormControl>
			<FormControl label="연락처" htmlFor="deliveryContact" required={true}>
				<input
					type="text"
					name="deliveryContact"
					id="phone"
					placeholder="연락처를 입력하세요"
					pattern="^\d{2,3}-\d{3,4}-\d{4}"
					required
				/>
			</FormControl>
			<FormControl label="주소" htmlFor="deliveryAddress" required>
				<input
					type="text"
					name="deliveryAddress"
					id="deliveryAddress"
					placeholder="배달받을 주소를 입력하세요."
					required
					autoFocus
				/>
			</FormControl>
			<FormControl label="결제수단" htmlFor="paymentMethod" required>
				<select name="paymentMethod" id="paymentMethod">
					<option value="마이페이">마이페이</option>
					<option value="만나서결제">만나서결제</option>
				</select>
			</FormControl>
			<FormControl label="가게사장님께" htmlFor="messageToShop">
				<textarea name="messageToShop" id="messageToShop" cols="30" rows="3" />
			</FormControl>
			<FormControl label="라이더님께" htmlFor="messageToRider">
				<textarea name="messageToRider" id="messageToRider" cols="30" rows="3" />
			</FormControl>
		</form>
	);
}

export default OrderForm;
