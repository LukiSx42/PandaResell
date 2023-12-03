import React from "react";
import './style/page.css';
import ItemDB from '../config/db.json';
import ItemOnPage from './item';

class PageView extends React.Component {
    constructor(props) {
        super(props);
        let c = 0;
        this.parsePages().forEach(item => { c++; })
        this.props.pageUpdate(c);
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
        let c = 0;
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
                return b.basePrice.yuan - a.basePrice.yuan;
            });
        } else if (this.props.sorting.id == "broke") {
            items.sort((a, b) => {
                return a.basePrice.yuan - b.basePrice.yuan;
            });
        }

        let i = 0;
        items.forEach(item => {
            if (i >= 25 * (this.props.currentPage+1) && i < 25 * (this.props.currentPage+2)) {
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