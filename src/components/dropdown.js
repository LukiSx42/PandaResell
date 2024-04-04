import React from "react";
import '../style/dropdown.css';

const Dropdown = () => {
    return (
        <div className="dropdownBody">
            <div className="sec-center"> 	
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
                <label className="for-dropdown" htmlFor="dropdown">
                    ≡ Menu
                </label>
                <div className="section-dropdown"> 
                    <a href="/info">📖 Info</a>
                    <a href="/itemy">🔥 Itemy</a>
                    <a href="/kontakt">📞 Kontakt</a>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;