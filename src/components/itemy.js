import React from "react";
import Shop from "../shop/shop";
import Navbar from "./navbar";
import '../shop/style/shop.css';

const Itemy = () => {
    return (
        <div className="shop">
            <Navbar active="itemy" />
            <Shop />
        </div>
    );
};

export default Itemy;