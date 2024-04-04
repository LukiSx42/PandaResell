import Dropdown from './dropdown';
import '../style/textEffects.css';
import '../style/navbar.css';
import { useNavigate } from "react-router-dom";

function NavbarList(props) {
  return (
    <ul className="navbarList">
      <li key="nav-1">
        <a href={((props.active == "kontakt") ? "#" : "/kontakt")}
          className={"navbarLink "+((props.active == "kontakt") ? "active" : "")}>
          📞 Kontakt
        </a>
      </li>
      <li key="nav-2">
        <a href={((props.active == "itemy") ? "#" : "/itemy")}
          className={"navbarLink "+((props.active == "itemy") ? "active" : "")}>
          🔥 Itemy
        </a>
      </li>
      <li key="nav-3">
        <a href={((props.active == "info") ? "#" : "/info")}
          className={"navbarLink "+((props.active == "info") ? "active" : "")}>
          📖 Info
        </a>
      </li>
    </ul>
  );
}

function Navbar(props) {
  const navigate = useNavigate();
  const navToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <Dropdown />
      <div className="navbar">
        <NavbarList active={ props.active } />
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
