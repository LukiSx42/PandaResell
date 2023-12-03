import React from "react";
import './style/item.css';

class ItemOnPage extends React.Component {
    constructor(props) {
        super(props);
    }

    getTypeEmoji() { // TODO: Return an emoji for each item type
        let emoji = "";
        if (this.props.item.type.includes("T-Shirt")) {
            emoji += "👕";
        }
        if (this.props.item.type.includes("Shorts")) {
            emoji += "🩳";
        } 
        if (this.props.item.type.includes("Hoodie")) {
            emoji += "👘";
        }
        if (this.props.item.type.includes("Hat")) {
            emoji += "🎩";
        }
        if (this.props.item.type.includes("Jacket")) {
            emoji += "🧥";
        }
        if (this.props.item.type.includes("Thin-Jacket")) {
            emoji += "🥼";
        }
        if (this.props.item.type.includes("Long-Shirt")) {
            emoji += "👕";
        }
        if (this.props.item.type.includes("Polo-Shirt")) {
            emoji += "👔";
        }
        if (this.props.item.type.includes("Underwear")) {
            emoji += "🩲";
        }
        if (this.props.item.type.includes("Shoes")) {
            emoji += "👟";
        }
        if (this.props.item.type.includes("Sweater")) {
            emoji += "👘";
        }
        if (this.props.item.type.includes("Socks")) {
            emoji += "🧦";
        }
        if (this.props.item.type.includes("Other")) {
            emoji += "💎";
        }
        if (this.props.item.type.includes("Pants")) {
            emoji += "👖";
        }
        if (this.props.item.type.includes("Vest")) {
            emoji += "🦺";
        }
        if (this.props.item.type.includes("Bag")) {
            emoji += "🎒";
        }
        return emoji;
    }

    renderSeller() {
        let seller = "";
        this.props.item.seller.split("_").forEach(word => {
            seller = seller.concat(word[0].toUpperCase(), word.slice(1), " ");
        });
        return seller;
    }

    render() {
        return (
            <div className="nftBody">
                <div className="nft">
                    <div className='nftMain'>
                        <img className='tokenImage' src={"/images/" + this.props.item.seller + "/" + this.props.item.id +"_icon.png" } alt="Item" />
                        <h2>{ this.getTypeEmoji() } { this.props.item.brand.join(" ").toUpperCase() }</h2>
                        <p className='description'>{ this.props.item.name }</p>
                        <div className='tokenInfo'>
                            <div className="price">
                                <ins>€</ins>
                                <p>{ this.props.item.price[0][0] }~{ this.props.item.price[0][1] } EUR</p>
                                </div>
                                <div className="duration">
                                <ins>◷</ins>
                                <p>{ this.props.item.type.join(" / ") }</p>
                            </div>
                        </div>
                        <hr />
                        <div className='creator'>
                            <div className='wrapper'>
                            <img src={"/" + this.props.item.seller + ".png"} alt="Creator" />
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