import React from "react";
import './style/page.css';
import ItemDB from '../config/db.json';
import ItemOnPage from './item';

class PageView extends React.Component {
    constructor(props) {
        super(props);
    }

    findAllBrands(items) {
        let brandDB = {};
        items.forEach(item => {
            item.brand.forEach(brand => {
                if (Object.keys(brandDB).indexOf(brand) === -1) {
                    brandDB[brand] = 1;
                } else {
                    brandDB[brand]++;
                }
            });
        });

        return brandDB;
    }

    parsePages() {
        let pages = [];
        let page = [];
        ItemDB.shops.map(shop => {
            ItemDB[shop].map(item => {
                // TODO: Filters
                page.push(item);
                if (Object.keys(page).length >= 25) {
                    pages.push(...[page]);
                    page = [];
                }
            });
        });

        if (page.length > 0) {
            pages.push(page);
        }
        if (pages == []) {
            pages = [[]];
        }

        return pages;
    }

    randomSort(array) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex > 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    renderPage(displayPage) {
        console.log("RENDERING PAGE!");
        let page = [];
        let items = [];
        ItemDB.shops.forEach(shop => {
            ItemDB[shop].forEach(item => {
                items.push(item);
            });
        });

        if (this.props.sorting.id == "random") {
            items = this.randomSort(items);
        } else if (this.props.sorting.id == "rich") {
            items.sort((a, b) => {
                return b.basePrice.yuan[0] - a.basePrice.yuan[0];
            });
        } else if (this.props.sorting.id == "broke") {
            items.sort((a, b) => {
                return a.basePrice.yuan[0] - b.basePrice.yuan[0];
            });
        }
        
        let i = 0; // this 'i' is used for pageUpdate();   (pls leave it, thx)
        items.forEach(item => {
            if (i >= 25 * (this.props.currentPage) && i < 25 * (this.props.currentPage+1)) {
                page.push(<ItemOnPage item={ item } />);
            }
            i++;
        });

        
        let lenght = 0;
        page.forEach(item => lenght++);
        if (lenght == 0) {
            return (
                <div className="error">
                    <h1>⛔ Nenašli sa žaidne itemy ⛔</h1>
                </div>
            );
        }

        /* Updating Values/DBs */
        if (this.props.doUpdate) {
            this.props.updateBrands(this.findAllBrands(items)); // Brand update
            
            this.props.pageUpdate(Math.ceil(i/25)); // Page update
        }

        return <div>{page}</div>;
    }

    render() {
        return (
            <div className="page">
                { this.renderPage(this.props.currentPage) }
            </div>
        );
    }
}

export default PageView;