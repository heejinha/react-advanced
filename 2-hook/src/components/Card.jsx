const Card = ({ header, data = [], footer}) => {
	return (
		<div className="Card">
			<header>{ header }</header>
			<main>
				{
					data.map(({ term, description }) => {
						return (
							<dl key={ term }>
								<dt>{ term }</dt>
								<dd>{ description }</dd>
							</dl>
						);
					})
				}
			</main>
			<footer>{ footer }</footer>
		</div>
	);
}

export default Card;
