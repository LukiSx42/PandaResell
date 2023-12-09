import React from "react";
import './style/filters.css';
import Popup from 'reactjs-popup';

function renderBrands(brands) {
    console.log(brands);

    return (
        <div className="brands">

        </div>
    );
}

function Filters(props) {
    return (
        <div className="filters">
            <h2>🔍 Filtre</h2>
            <div class="filters-container">
                <Popup trigger={ <button className="brands-btn" style={{"--clr": "#0FF0FC"}}><span>💎 Značky</span><i></i></button> } position="right center">
                    <div className="brands-container">
                        { renderBrands(props.brands) }
                    </div>
                </Popup>
                <label for="checkbox-2">
                    <input type="checkbox" id="checkbox-2" name="checkbox-2"/>
                    ⭐ Typy
                </label>
                <label for="checkbox-3">
                    <input type="checkbox" id="checkbox-3" name="checkbox-3"/>
                🍐 Pears
                </label>
                <label for="checkbox-4">
                    <input type="checkbox" id="checkbox-4" name="checkbox-4"/>
                🍐 Pears
                </label>
            </div>
        </div>
    );
}

export default Filters;