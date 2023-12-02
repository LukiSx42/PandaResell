import React from "react";
import './style/page.css';
import ItemDB from '../config/db.json';
import ItemOnPage from './item';

class PageView extends React.Component {
    constructor(props) {
        super(props);
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

    renderPage(displayPage) {
        console.log("RENDERING PAGE!");
        let c = 0;
        let page = [];
        ItemDB.shops.forEach(shop => {
            ItemDB[shop].forEach(item => {
                if (c >= 25 * (displayPage+1) && c < 25 * (displayPage+2)) {
                    page.push(<ItemOnPage item={ item } currPage={ this.props.currentPage } />);
                }
                c++;
            });
        });
        
        if (page.lenght == 0) {
            return (
                <div>
                    <h1>⛔ Nenašli sa žaidne itemy ⛔</h1>
                </div>
            );
        }

        console.log(page);

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