import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import OrderStatusCard from './OrderStatusCard';
import OrderPaymentCard from './OrderPaymentCard';
import OrderDeliveryCard from './OrderDeliveryCard';
import { useEffect, useState } from 'react';
import OrderApi from 'shared/api/OrderApi';
import { useDialog, useLoading } from '../../lib/MyLayout';
import ErrorDialog from '../../components/ErrorDialog';

const OrderPage = () => {
	const [order, setOrder] = useState(null);
	const { openDialog } = useDialog();
	const { startLoading, finishLoading } = useLoading();

	const fetch = async () => {
		startLoading('주문 정보 로딩 중');
		try {
			const order = await OrderApi.fetchMyOrder();
			setOrder(order);
		} catch (e) {
			console.error(e);
			openDialog(<ErrorDialog />);
		} finally {
			finishLoading();
		}
	}

	useEffect(() => {
		fetch();
	}, []);

	useEffect(() => {
		const timer = setInterval(async () => {
			const order = await OrderApi.fetchMyOrder();
			setOrder(order);
		}, 5000);

		return () => {
			clearInterval(timer)
		};

	}, []);
	return (
		<div className="OrderPage">
			<Page
				header={<Title>주문 내역</Title>}
				footer={<Navbar></Navbar>}
			>
				{
					order && (
						<>
							<OrderStatusCard order={order} />
							<OrderPaymentCard order={order} />
							<OrderDeliveryCard order={order} />
						</>
					)
				}
			</Page>
		</div>
	);
};
export default OrderPage;
