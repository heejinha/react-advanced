import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import OrderAbleProductItem from './OrderAbleProductItem';
import ProductApi from 'shared/api/ProductApi';

const ProductPage = () => {
	const [products, setProducts] = useState([]);

	const fetch = async () => {
		try {
			const products = await ProductApi.fetchProductList();
			setProducts(products);
		} catch(e) {
			console.error(e);
		}
	}

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className="ProductPage">
			<Page
				header={<Title>메뉴목록</Title>}
				footer={<Navbar />}
			>
				<ul>
					{
						products.map(product => (
							<li key={product.id}>
								<OrderAbleProductItem product={product} />
							</li>
						))
					}
				</ul>
			</Page>
		</div>
	);
};
export default ProductPage;
