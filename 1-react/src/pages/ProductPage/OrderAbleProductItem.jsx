import ProductItem from '../../components/ProductItem';

const OrderAbleProductItem = ({ product }) => {

	const handleClick = ({ id, name }) => {
		// TODO 장바구니 구현
		console.log(product.name);
	}

	return (
		<ProductItem
			product={product}
			onClick={() => handleClick(product)}
		/>
	);
}

export default OrderAbleProductItem;
