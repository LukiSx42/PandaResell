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
            filters: []
        }

        this.pageUpdate = this.pageUpdate.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
    }

    changeFilters(updated) {
        this.setState({
            filters: updated
        });
    }

    pageUpdate(maxCount) {
        this.setState({
            maxItems: maxCount
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
                <TopBar filters={ this.state.filters } />
                <hr />
                <div className="split">
                    <Filters cfg={ ShopConfig.filters } active={ this.state.filters } />
                    <PageView filters={ this.state.filters } currentPage={ this.state.currentPage } pageUpdate={ this.pageUpdate }/>
                </div>
                <PageNav current={ this.state.currentPage } max={ this.state.maxItems } nextPage={ this.nextPage } prevPage={ this.prevPage } />
                <Bottom />
            </div>
        );
    }
}

export default Shop;