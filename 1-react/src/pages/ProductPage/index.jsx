import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import ProductItem from '../../components/ProductItem';
import ProductApi from 'shared/api/ProductApi';
import { Component } from 'react';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productList: [],
		}
	}

	async fetch() {
		try {
			const productList = await ProductApi.fetchProductList();
			this.setState({ productList });
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
									<ProductItem product={product} />
								</li>
							))
						}
					</ul>
				</Page>
			</div>
		);
	}
}

export default ProductPage;
