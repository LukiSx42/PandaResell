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
            <div class="container">
                <label for="checkbox-1">
                    <input type="checkbox" id="checkbox-1" name="checkbox-1"/>
                    🥕 Carrots
                </label>
                <label for="checkbox-2">
                    <input type="checkbox" id="checkbox-2" name="checkbox-2"/>
                    🍎 Apples 
                </label>
                <label for="checkbox-3">
                    <input type="checkbox" id="checkbox-3" name="checkbox-3"/>
                🍐 Pears
                </label>
            </div>
        </div>
    );
}

export default Filters;