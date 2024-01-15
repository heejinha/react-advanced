import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Navbar from '../../components/Navbar';
import OrderAbleProductItem from './OrderAbleProductItem';
import ProductApi from 'shared/api/ProductApi';
import { useDialog, useLoading } from '../../lib/MyLayout';
import ErrorDialog from '../../components/ErrorDialog';

const ProductPage = () => {
	const [products, setProducts] = useState([]);
	const { openDialog } = useDialog();
	const { startLoading, finishLoading } = useLoading();

	const fetch = async () => {
		startLoading('메뉴 목록 로딩 중');
		try {
			const products = await ProductApi.fetchProductList();
			setProducts(products);
		} catch(e) {
			console.error(e);
			openDialog(<ErrorDialog />);
		} finally {
			finishLoading();
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
