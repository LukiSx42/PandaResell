import './navbar.css';
import './textEffects.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbarList">
        <li>
            <a href="/kontakt" className="navbarLink">📞 Kontakt</a>
        </li>
        <li>
            <a href="/items" className="navbarLink">🔥 Itemy</a>
        </li>
        <li>
            <a href="/soon" className="navbarLink">❓ Temp</a>
        </li>
      </ul>
      <div className="navbarItem">
        <img src="/logo.png" id="navbarLogo" />
      </div>
      <div className="navbarItem">
        <h1 id="navbarTitle" className="glowPurple rainbowHover">
          Fantázia Reps
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
