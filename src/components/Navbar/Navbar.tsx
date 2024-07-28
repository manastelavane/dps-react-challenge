import dpsLogo from '../../assets/DPS.svg';
import { MY_PORTFOLIO_LINK } from '../../config';
import './Navbar.css';

const Navbar = () => {
	return (
		<nav className="navbar">
			<img src={dpsLogo} alt="logo" className="logo" />
			<span className="title">DPS Frontend Coding Challenge</span>
			<a
				href={MY_PORTFOLIO_LINK}
				target="_blank"
				rel="noreferrer"
				className="title portfolio"
			>
				<span>Portfolio</span>
			</a>
		</nav>
	);
};

export default Navbar;
