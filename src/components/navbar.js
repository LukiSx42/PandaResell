import Dropdown from './dropdown';
import '../style/textEffects.css';
import '../style/navbar.css';
import { useNavigate } from "react-router-dom";

function NavbarList() {
  return (
    <ul className="navbarList">
        <li>
            <a href="/kontakt" className="navbarLink">📞 Kontakt</a>
        </li>
        <li>
            <a href="/itemy" className="navbarLink">🔥 Itemy</a>
        </li>
        <li>
            <a href="/info" className="navbarLink">📖 Info</a>
        </li>
    </ul>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const navToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Dropdown />
      <div className="navbar">
        <NavbarList />
        <div className="navbarItem">
          <img src="/logo.png" id="navbarLogo" />
        </div>
        <div className="navbarItem" onClick={ navToHome }>
          <h1 id="navbarTitle" className="glowPurple rainbowHover">
            Fantázia Reps™️
          </h1>
        </div>
      </div>
    </div>
    
  );
}

export default Navbar;
