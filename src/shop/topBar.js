import transalateTypes from "./scripts/translateTypes";
import './style/sorting.css';

function renderFilterText(filters) {
    let len = 0;
    filters.forEach(() => { len += 1; });
    if (len > 2) { // too long
        return "Filtre: "+len;
    } else if (len === 0) {
        return "Všetky Produkty";
    } else if (len === 1) {
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

            <div className="mobile-filters">
                <p
                    onClick={ () => {
                        let shop = document.getElementsByClassName("page")[0];
                        let shopNav = document.getElementsByClassName("multi-button")[0];
                        let filterDiv = document.getElementsByClassName("mobile-filter-view")[0];

                        if (shop.style.display !== "none") { // Hide shop, display filters
                            shop.style.display = "none";
                            shop.style.visibility = "hidden";
                            shopNav.style.display = "none";
                            shopNav.style.visibility = "hidden";
                            filterDiv.style.display = "block";
                            filterDiv.style.visibility = "visible";
                        } else { // Hide filters, display shop
                            shop.style.display = "block";
                            shop.style.visibility = "visible";
                            shopNav.style.display = "flex";
                            shopNav.style.visibility = "visible";
                            filterDiv.style.display = "none";
                            filterDiv.style.visibility = "hidden";
                        }
                    }}
                ><b>Filtre</b></p>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z" stroke="#E2CFEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="dropdownSort">
                <nav>
                    <label htmlFor="touch"><span>{ props.sorting.name.toUpperCase() }</span></label>               
                    <input type="checkbox" id="touch" /> 

                    <ul className="slide">
                        <li key="sort-1"><a href="#" onClick={(props.sorting.id !== defaultSort.id) ? ()=>{props.changeSort(defaultSort)} : ()=>{}} >🛍️ { defaultSort.name }</a></li> 
                        <li key="sort-2"><a href="#" onClick={(props.sorting.id !== randomSort.id) ? ()=>{props.changeSort(randomSort)} : ()=>{}} >❓ { randomSort.name }</a></li> 
                        <li key="sort-3"><a href="#" onClick={(props.sorting.id !== richSort.id) ? ()=>{props.changeSort(richSort)} : ()=>{}} >💎 { richSort.name }</a></li>
                        <li key="sort-4"><a href="#" onClick={(props.sorting.id !== brokeSort.id) ? ()=>{props.changeSort(brokeSort)} : ()=>{}} >🪙 { brokeSort.name }</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TopBar;