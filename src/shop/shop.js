import loadItemTypes from "./scripts/loadItemTypes";
import Bottom from "../components/bottom";
import PageView from "./pageView";
import Filters from "./filters";
import PageNav from "./pageNav";
import TopBar from "./topBar";
import React from "react";
import './style/shop.css';

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.itemTypes = loadItemTypes();

        this.state = {
            currentPage: 0,
            pageCount: 1,
            maxItems: 25,
            filters: [],
            sorting: {
                "name": "Základné Zoradenie",
                "id": "default"
            },
            brandDB: {},
            itemCount: 0,
            doUpdate: true
        }

        this.updateItemCount = this.updateItemCount.bind(this);
        this.changeFilters = this.changeFilters.bind(this);
        this.updateBrands = this.updateBrands.bind(this);
        this.pageUpdate = this.pageUpdate.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    changeFilters(updated) {
        let nf = [...this.state.filters];
        if (updated in this.state.filters) {
            nf.pop(nf.indexOf(updated));
        } else {
            nf.push(updated);
        }

        this.setState({
            filters: nf,
            doUpdate: true
        });
    }

    changeSort(sort) {
        this.setState({
            sorting: sort
        });
    }

    pageUpdate(maxCount) {
        this.setState({
            pageCount: maxCount,
            doUpdate: false
        });
    }

    nextPage() {
        window.scrollTo(0, 0);

        this.setState({
            currentPage: this.state.currentPage+1
        });
    }

    prevPage() {
        window.scrollTo(0, 0);
        
        this.setState({
            currentPage: this.state.currentPage-1
        });
    }

    updateBrands(brands) {
        this.setState({
            brandDB: brands
        });
    }

    updateItemCount(itemCount) {
        this.setState({
            itemCount: itemCount
        });
    }

    render() {
        return (
            <div className="shopBlock">
                <TopBar 
                    filters={ this.state.filters }
                    sorting={ this.state.sorting }
                    changeSort={ this.changeSort }
                />
                <hr />
                <div className="split">
                    <Filters
                        active={ this.state.filters }
                        changeFilters={ this.changeFilters }
                        brands={ this.state.brandDB }
                    />
                    <PageView
                        filters={ this.state.filters }
                        currentPage={ this.state.currentPage }
                        pageUpdate={ this.pageUpdate }
                        sorting={ this.state.sorting }
                        updateBrands={ this.updateBrands }
                        doUpdate={ this.state.doUpdate }
                        itemCount={ this.state.itemCount }
                        updateItemCount={ this.updateItemCount }
                    />
                </div>
                <PageNav
                    current={ this.state.currentPage }
                    max={ this.state.pageCount }
                    nextPage={ this.nextPage }
                    prevPage={ this.prevPage }
                />
                <Bottom />
            </div>
        );
    }
}

export default Shop;