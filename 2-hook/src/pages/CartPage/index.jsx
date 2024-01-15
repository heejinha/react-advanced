import ProductApi from 'shared/api/ProductApi';
import Page from '../../components/Page';
import Title from '../../components/Title';
import PaymentButton from './PaymentButton';
import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem';
import OrderApi from 'shared/api/OrderApi';
import OrderForm from './OrderForm';
import { useParams } from '../../lib/MyRouter';
import { useDialog, useLoading } from '../../lib/MyLayout';
import ErrorDialog from '../../components/ErrorDialog';
import PaymentSuccessDialog from './PaymentSuccessDialog';

const CartPage = () => {
	const [product, setProduct] = useState(null);
	const { productId } = useParams();
	const { startLoading, finishLoading } = useLoading();
	const { openDialog } = useDialog();

	const fetch = async (id) => {
		startLoading('장바구니 정보 로딩 중');
		try {
			const product = await ProductApi.fetchProduct(id);
			setProduct(product);
		} catch (e) {
			console.error(e);
			openDialog(<ErrorDialog />);
		} finally {
			finishLoading();
		}
	}

	const handleSubmit = async (params) => {
		console.log(params);
		startLoading('결제 중');
		try {
			await OrderApi.createOrder(params);
		} catch (e) {
			console.error(e);
			openDialog(<ErrorDialog />);
			return;
		} finally {
			finishLoading();

		}

		// 결제 성공 후 페이지 이동
		openDialog(<PaymentSuccessDialog />);
	}

	useEffect(() => {
		if (productId) fetch(productId);
	}, [productId]);

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
