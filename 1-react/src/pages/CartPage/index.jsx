import { Component } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import ProductItem from '../../components/ProductItem';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';
import ProductApi from 'shared/api/ProductApi';
import OrderApi from 'shared/api/OrderApi';
import { withRouter } from '../../lib/MyRouter';
import { withLayout } from '../../lib/MyLayout';
import ErrorDialog from '../../components/ErrorDialog';
import PaymentSuccessDialog from './PaymentSuccessDialog';

const fakeProduct = {
	"id": "CACDA421",
	"name": "해물 계란 라면",
	"price": 6000,
	"thumbnail": "./images/menu-해물계란라면.jpg"
};

class CartPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async fetch() {
		const { params, startLoading, finishLoading, openDialog } = this.props;
		const { productId } = params();
		if (!productId) return;

		startLoading('장바구니에 상품 담는 중...');
		try {
			const product = await ProductApi.fetchProduct(productId);
			this.setState({ product });
		} catch (e) {
			console.error(e);
			openDialog(<ErrorDialog />);
			return;
		}
		finishLoading();
	}

	async handleSubmit(params) {
		console.log(params);
		const { startLoading, finishLoading, openDialog } = this.props;

		startLoading('결제 중...');
		try {
			await OrderApi.createOrder(params);
		} catch (e) {
			openDialog(<ErrorDialog />);
			return;
		}
		finishLoading();

		// 결제 성공 후 페이지 이동
		// this.props.navigate('/order');
		openDialog(<PaymentSuccessDialog />);
	}

	async componentDidMount() {
		await this.fetch();
	}

	render() {
		const { product } = this.state;
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
						onSubmit={(params) => this.handleSubmit(params)}
					/>
				</Page>
			</div>

		);
	}
}

export default withLayout(withRouter(CartPage));
