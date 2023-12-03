import './style/sorting.css';

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
            <h1>« Všetky Produkty »</h1>
            <div className="dropdownSort">
                <nav>
                    <label for="touch"><span>{ props.sorting.name.toUpperCase() }</span></label>               
                    <input type="checkbox" id="touch" /> 

                    <ul class="slide">
                        <li><a onClick={(props.sorting.id != defaultSort.id) ? ()=>{props.changeSort(defaultSort)} : ()=>{}} >🛍️ { defaultSort.name }</a></li> 
                        <li><a onClick={(props.sorting.id != randomSort.id) ? ()=>{props.changeSort(randomSort)} : ()=>{}} >❓ { randomSort.name }</a></li> 
                        <li><a onClick={(props.sorting.id != richSort.id) ? ()=>{props.changeSort(richSort)} : ()=>{}} >💎 { richSort.name }</a></li>
                        <li><a onClick={(props.sorting.id != brokeSort.id) ? ()=>{props.changeSort(brokeSort)} : ()=>{}} >🪙 { brokeSort.name }</a></li>
                    </ul>
                </nav> 
            </div>
        </div>
    );
};

export default TopBar;