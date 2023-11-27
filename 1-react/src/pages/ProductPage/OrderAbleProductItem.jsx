import ProductItem from '../../components/ProductItem';
import { routerContext } from '../../lib/MyRouter';

const OrderAbleProductItem = ({ product }) => (
	<routerContext.Consumer>
		{
			({ changePath }) => {
				const handleClick = () => changePath('/cart');
				return (
					<ProductItem
						product={product}
						onClick={() => handleClick(product)}
					/>
				)
			}
		}
	</routerContext.Consumer>
);

export default OrderAbleProductItem;
