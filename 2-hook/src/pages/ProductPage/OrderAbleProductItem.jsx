import ProductItem from '../../components/ProductItem';
import { useNavigate } from '../../lib/MyRouter';

const OrderAbleProductItem = ({ product }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/cart?productId=${product.id}`)
	};
	return (
		<ProductItem
			product={product}
			onClick={() => handleClick(product)}
		/>
	);
};

export default OrderAbleProductItem;
