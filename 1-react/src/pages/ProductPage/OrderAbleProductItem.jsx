import ProductItem from '../../components/ProductItem';
import { withRouter } from '../../lib/MyRouter';

const OrderAbleProductItem = ({ product, navigate }) => {
	const handleClick = () => navigate(`/cart?productId=${product.id}`);
	return (
		<ProductItem
			product={product}
			onClick={() => handleClick(product)}
		/>
	);
};

export default withRouter(OrderAbleProductItem);
