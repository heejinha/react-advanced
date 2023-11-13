import { Component } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import ProductItem from '../../components/ProductItem';
import OrderForm from './OrderForm';
import PaymentButton from './PaymentButton';
import ProductApi from 'shared/api/ProductApi';

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
		try {
			const product = await ProductApi.fetchProduct('CACDA421');
			this.setState({ product });

		} catch (e) {
			console.error(e);
		}
	}

	handleSubmit(params) {
		console.log(params)
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

export default CartPage;
