import ProductItem from '../../components/ProductItem';

const OrderAbleProductItem = ({ product, navigate }) => {
	const handleClick = () => {
		// navigate(`/cart?productId=${product.id}`)
	};
	return (
		<ProductItem
			product={product}
			onClick={() => handleClick(product)}
		/>
	);
};

export default OrderAbleProductItem;
