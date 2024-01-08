import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import OrderStatusCard from './OrderStatusCard';
import OrderPaymentCard from './OrderPaymentCard';
import OrderDeliveryCard from './OrderDeliveryCard';
import { useEffect, useState } from 'react';
import OrderApi from 'shared/api/OrderApi';

const OrderPage = () => {
	const [order, setOrder] = useState(null);

	const fetch = async () => {
		try {
			const order = await OrderApi.fetchMyOrder();
			setOrder(order);
		} catch (e) {
			console.error(e);
			return;
		}
	}

	useEffect(() => {
		fetch();
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
