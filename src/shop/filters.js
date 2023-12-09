import emojiFromType from "./scripts/emojiFromType";
import Popup from 'reactjs-popup';
import './style/filters.css';
import React from "react";

function renderBrands(brands) {
    console.log(brands);

    return (
        <div className="brands">

        </div>
    );
}

function renderTypes(types) {
    let filters = [];

    types.forEach(type => {
        filters.push(
            <label for="checkbox-2">
                <input type="checkbox" id="checkbox-2" name="checkbox-2"/>
                { emojiFromType([type]) + type }
            </label>
        );
    })

    return filters;
}

function Filters(props) {
    return (
        <div className="filters">
            <h2>🔍 Filtre</h2>
            <Popup trigger={ <button className="brands-btn" style={{"--clr": "#0FF0FC"}}><span>💎 Značky</span><i></i></button> } position="right center">
                <div className="brands-container">
                    { renderBrands(props.brands) }
                </div>
            </Popup>
            <div class="filters-container">
                { renderTypes(props.types) }
            </div>
        </div>
    );
}

export default Filters;