
const Navbar = ({ match }) => {
	return (
		<nav className="Navbar">
			<a to="/">
				메뉴목록
			</a>
			<a to="/order">주문내역</a>
		</nav>
	);
}

export default Navbar;
