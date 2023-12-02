import React from "react";
import './style/item.css';

class ItemOnPage extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.item;
    }

    getTypeEmoji() { // TODO: Return an emoji for each item type
        let emoji = "";
        if (this.data.type.includes("T-Shirt")) {
            emoji += "👕";
        }
        if (this.data.type.includes("Shorts")) {
            emoji += "🩳";
        } 
        if (this.data.type.includes("Hoodie")) {
            emoji += "👘";
        }
        if (this.data.type.includes("Hat")) {
            emoji += "🎩";
        }
        if (this.data.type.includes("Jacket")) {
            emoji += "🧥";
        }
        if (this.data.type.includes("Thin-Jacket")) {
            emoji += "🥼";
        }
        if (this.data.type.includes("Long-Shirt")) {
            emoji += "👕";
        }
        if (this.data.type.includes("Polo-Shirt")) {
            emoji += "👔";
        }
        if (this.data.type.includes("Underwear")) {
            emoji += "🩲";
        }
        if (this.data.type.includes("Shoes")) {
            emoji += "👟";
        }
        if (this.data.type.includes("Sweater")) {
            emoji += "👘";
        }
        if (this.data.type.includes("Socks")) {
            emoji += "🧦";
        }
        if (this.data.type.includes("Other")) {
            emoji += "💎";
        }
        if (this.data.type.includes("Pants")) {
            emoji += "👖";
        }
        if (this.data.type.includes("Vest")) {
            emoji += "🦺";
        }
        if (this.data.type.includes("Bag")) {
            emoji += "🎒";
        }
        return emoji;
    }

    renderSeller() {
        let seller = "";
        this.data.seller.split("_").forEach(word => {
            seller = seller.concat(word[0].toUpperCase(), word.slice(1), " ");
        });
        return seller;
    }

    render() {
        return (
            <div className="nftBody">
                <div className="nft">
                    <div className='nftMain'>
                        <img className='tokenImage' src={"/images/" + this.data.seller + "/" + this.data.id +"_icon.png" } alt="Item" />
                        <h2>{ this.getTypeEmoji() } { this.props.currPage } - { this.data.brand.join(" ").toUpperCase() }</h2>
                        <p className='description'>{ this.data.name }</p>
                        <div className='tokenInfo'>
                            <div className="price">
                                <ins>€</ins>
                                <p>{ this.data.price[0][0] }~{ this.data.price[0][1] } EUR</p>
                                </div>
                                <div className="duration">
                                <ins>◷</ins>
                                <p>{ this.data.type.join(" / ") }</p>
                            </div>
                        </div>
                        <hr />
                        <div className='creator'>
                            <div className='wrapper'>
                            <img src={"/" + this.data.seller + ".png"} alt="Creator" />
                            </div>
                            <p><ins>Seller {">>"}</ins> { this.renderSeller() }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemOnPage;