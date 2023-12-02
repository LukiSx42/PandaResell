import React from "react";
import './style/filters.css';

function viewFilters(cfg, active) {
    let view = cfg.map(filter => 
        <li
            className={(active.includes(filter.id)) ? "filter filterActive" : "filter"} key={ cfg.indexOf(filter) }>
                {filter.name}
        </li>
    );

    return view;
}

function Filters(props) {
    return (
        <div className="filters">
            <h2>🔍 Filtre</h2>
            <div>
                <div className="box">
                    <input id="one" type="checkbox" />
                    <span className="check"></span>
                    <label for="one">Check me.</label>
                </div>
                <div className="box">
                    <input id="two" type="checkbox" />
                    <span className="check"></span>
                    <label for="two">Hey! Check me too.</label>
                </div>
            </div>
        </div>
    );
}

export default Filters;