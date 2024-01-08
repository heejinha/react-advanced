import ProductApi from 'shared/api/ProductApi';
import Page from '../../components/Page';
import Title from '../../components/Title';
import PaymentButton from './PaymentButton';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import OrderApi from 'shared/api/OrderApi';
import OrderForm from './OrderForm';

const CartPage = ({ productId }) => {
	const [product, setProduct] = useState(null);

	const fetch = async () => {
		if (!productId) return;

		try {
			const product = await ProductApi.fetchProduct(productId);
			setProduct(product);
		} catch (e) {
			console.error(e);
		}
	}

	const handleSubmit = async (params) => {
		console.log(params);
		try {
			await OrderApi.createOrder(params);
		} catch (e) {
			console.error(e);
		}
		// 결제 성공 후 페이지 이동
	}

	useEffect(() => {
		fetch();
	}, []);

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
				{
					product && <ProductItem product={product} />
				}
				<OrderForm
					onSubmit={(params) => handleSubmit(params)}
				/>
			</Page>
		</div>
	);
};

export default CartPage;
