import { Component } from 'react';
import Navbar from '../../components/Navbar';
import Title from '../../components/Title';
import Page from '../../components/Page';
import OrderDeliveryCard from './OrderDeliveryCard';
import OrderPaymentCard from './OrderPaymentCard';
import OrderStatusCard from './OrderStatusCard';
import OrderApi from 'shared/api/OrderApi';
import { withLayout } from '../../lib/MyLayout';


class OrderPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			order: null
		}
	}

	async fetch() {
		const { startLoading, finishLoading } = this.props;
		try {
			startLoading('주문 페이지 로딩 중...');
			const order = await OrderApi.fetchMyOrder();
			this.setState({ order });
			finishLoading();
		} catch (e) {
			console.error(e);
		}

	}

	async componentDidMount() {
		await this.fetch();
	}

	render() {
		const { order } = this.state;
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
	}
}

export default withLayout(OrderPage);
