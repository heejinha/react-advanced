import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import ProductApi from 'shared/api/ProductApi';
import { Component } from 'react';
import OrderAbleProductItem from './OrderAbleProductItem';
import { withLayout } from '../../lib/MyLayout';
import { Dialog } from '../../components/Dialog';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productList: [],
		}
	}

	async fetch() {
		const { startLoading, finishLoading } = this.props;
		try {
			startLoading('메뉴 목록 로딩 중...');
			const productList = await ProductApi.fetchProductList();
			this.setState({ productList });
			finishLoading();
		} catch(e) {
			console.error(e);
		}
	}

	async componentDidMount() {
		await this.fetch();
	}

	render() {
		return (
			<div className="ProductPage">
				<Page
					header={<Title>메뉴목록</Title>}
					footer={<Navbar></Navbar>}
				>
					<ul>
						{
							this.state.productList.map(product => (
								<li key={product.id}>
									<OrderAbleProductItem product={product} />
								</li>
							))
						}
					</ul>
				</Page>
			</div>
		);
	}
}

export default withLayout(ProductPage);
