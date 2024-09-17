import transalateTypes from "./scripts/translateTypes";
import emojiFromType from "./scripts/emojiFromType";
import './style/filters.css';
import React from "react";

function renderTypes(types, changeFilters, active) {
    let filters = [];

    types.forEach(type => {
        if (active.includes(type.toLowerCase())) {
            filters.push(
                <label className="lns-checkbox">
                    <input className="lns-checkbox-input" type="checkbox" onChange={changeFilters} name={type} checked={true} />
                    <span>{ emojiFromType([type]) + transalateTypes(type) }</span>
                </label>
            );
        } else {
            filters.push(
                <label className="lns-checkbox">
                    <input className="lns-checkbox-input" type="checkbox" onClick={changeFilters} name={type} />
                    <span>{ emojiFromType([type]) + transalateTypes(type) }</span>
                </label>
            );
        }
        filters.push( <br /> );
    });

    return filters;
}

function Filters(props) {
    return (
        <div>
            <div className="filters">
                <h2>🔍 Filtre</h2>
                <div className="filters-container">
                    { renderTypes(props.types, props.changeFilters, props.active) }
                </div>
            </div>
            <div className="mobile-filter-view">
                <h2>🔍 Filtre</h2>
                <div className="filters-container">
                    { renderTypes(props.types, props.changeFilters, props.active) }
                </div>
            </div>
        </div>
    );
}

export default Filters;