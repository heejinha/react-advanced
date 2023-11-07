import Page from '../../components/Page';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ProductItem from '../../components/ProductItem';
import FormControl from '../../components/FormControl';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';

const fakeProduct = {
	"id": "CACDA421",
	"name": "해물 계란 라면",
	"price": 6000,
	"thumbnail": "./images/menu-해물계란라면.jpg"
};

const CartPage = () => {
	return (
		<div className="CartPage">
			<Page
				header={
					<Title backUrl={"/"}>
						장바구니
					</Title>
				}
				footer={
					<PaymentButton />
				}
			>
				<ProductItem product={fakeProduct} />
				<OrderForm />
			</Page>
		</div>

	);
}

export default CartPage;
