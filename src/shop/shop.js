import React from "react";
import './style/shop.css';
import TopBar from "./topBar";
import Filters from "./filters";
import PageView from "./pageView";
import ShopConfig from '../config/shopConfig.json';
import Bottom from "../components/bottom";
import PageNav from "./pageNav";

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            pageCount: 1,
            maxItems: 25,
            filters: [],
            sorting: {
                "name": "Základné Zoradenie",
                "id": "default"
            }
        }

        this.pageUpdate = this.pageUpdate.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    changeFilters(updated) {
        this.setState({
            filters: updated
        });
    }

    changeSort(sort) {
        this.setState({
            sorting: sort
        });
    }

    pageUpdate(maxCount) {
        this.setState({
            pageCount: maxCount
        });
    }

    nextPage() {
        this.setState({
            currentPage: this.state.currentPage+1
        });
    }

    prevPage() {
        this.setState({
            currentPage: this.state.currentPage-1
        });
    }

    render() {
        return (
            <div className="shopBlock">
                <TopBar filters={ this.state.filters } sorting={ this.state.sorting } changeSort={ this.changeSort } />
                <hr />
                <div className="split">
                    <Filters cfg={ ShopConfig.filters } active={ this.state.filters } changeFilters={ this.changeFilters } />
                    <PageView filters={ this.state.filters } currentPage={ this.state.currentPage } pageUpdate={ this.pageUpdate } sorting={ this.state.sorting } />
                </div>
                <PageNav current={ this.state.currentPage } max={ this.state.pageCount } nextPage={ this.nextPage } prevPage={ this.prevPage } />
                <Bottom />
            </div>
        );
    }
}

export default Shop;