import transalateTypes from "./scripts/translateTypes";
import './style/sorting.css';

function renderFilterText(filters) {
    let len = 0;
    filters.forEach(() => { len += 1; });
    if (len > 2) { // too long
        return "Filtre: "+len;
    } else if (len == 0) {
        return "Všetky Produkty";
    } else if (len == 1) {
        return transalateTypes(filters[0]);
    } else {
        return transalateTypes(filters[0]) + " + " + transalateTypes(filters[1]);
    }
}

function TopBar(props) {
    let defaultSort = {
        "name": "Základné Zoradenie",
        "id": "default"
    }
    let randomSort = {
        "name": "Náhodné Zoradenie",
        "id": "random"
    }
    let richSort = {
        "name": "Od Najdrahších",
        "id": "rich"
    }
    let brokeSort = {
        "name": "Od Najlacnejších",
        "id": "broke"
    }

    return (
        <div>
            <h1 id="filterText">« { renderFilterText(props.filters) } »</h1>
            <h3 id="itemCount">♠️ { props.items } produktov</h3>

            <div className="dropdownSort">
                <nav>
                    <label htmlFor="touch"><span>{ props.sorting.name.toUpperCase() }</span></label>               
                    <input type="checkbox" id="touch" /> 

                    <ul className="slide">
                        <li key="sort-1"><a onClick={(props.sorting.id != defaultSort.id) ? ()=>{props.changeSort(defaultSort)} : ()=>{}} >🛍️ { defaultSort.name }</a></li> 
                        <li key="sort-2"><a onClick={(props.sorting.id != randomSort.id) ? ()=>{props.changeSort(randomSort)} : ()=>{}} >❓ { randomSort.name }</a></li> 
                        <li key="sort-3"><a onClick={(props.sorting.id != richSort.id) ? ()=>{props.changeSort(richSort)} : ()=>{}} >💎 { richSort.name }</a></li>
                        <li key="sort-4"><a onClick={(props.sorting.id != brokeSort.id) ? ()=>{props.changeSort(brokeSort)} : ()=>{}} >🪙 { brokeSort.name }</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TopBar;