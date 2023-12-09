import emojiFromType from "./scripts/emojiFromType";
import React from "react";
import './style/item.css';

class ItemOnPage extends React.Component {
    constructor(props) {
        super(props);
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
                        <h2>{ emojiFromType(this.props.item.type) } { (this.props.item.brand[0].toUpperCase() != this.props.item.type[0].toUpperCase()) ? this.props.item.brand.join(" ").toUpperCase() : "???" }</h2>
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