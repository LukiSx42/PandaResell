import React from "react";
import './style/page.css';
import ItemDB from '../config/db.json';
import ItemOnPage from './item';

class PageView extends React.Component {
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
        // console.log("RENDERING PAGE!");
        let page = [];
        let items = [];
        ItemDB.shops.forEach(shop => {
            ItemDB[shop].forEach(item => {
                if (this.props.filters.length > 0) {
                    let filtered = false;
                    item.type.forEach(type => {
                        if (this.props.filters.includes(type.toLowerCase())) {
                            filtered = true;
                        }
                    });
                    if (!filtered) {
                        return;
                    }
                }
                items.push(item);
            });
        });

        if (this.props.sorting.id === "random") {
            items = this.randomSort(items);
        } else if (this.props.sorting.id === "rich") {
            items.sort((a, b) => {
                return b.basePrice.yuan[0] - a.basePrice.yuan[0];
            });
        } else if (this.props.sorting.id === "broke") {
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
        if (lenght === 0) {
            return (
                <div className="error">
                    <h1>⛔ Nenašli sa žaidne produkty ⛔</h1>
                </div>
            );
        }

        /* Updating Values/DBs */
        if (this.props.doUpdate) {
            this.props.updateBrands(this.findAllBrands(items)); // Brand update
            
            this.props.pageUpdate(Math.ceil(i/25)); // Page update

            this.props.updateItemCount(i); // Item Count update
        }

        return <div className="page-content">{page}</div>;
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