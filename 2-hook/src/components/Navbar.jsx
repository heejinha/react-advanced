import { Link, useMatch } from '../lib/MyRouter';

const Navbar = () => {
	const match = useMatch();
	return (
		<nav className="Navbar">
			<Link to="/" className={match('/') ? 'active' : ''}>
				메뉴목록
			</Link>
			<Link to="/order" className={match('/order') ? 'active' : ''}>
				주문내역
			</Link>
		</nav>
	);
}

export default Navbar;
