import React from "react";
import '../style/kontakt.css';
import Navbar from './navbar';
import BottomBar from './bottom';

const KontaktCard = () => {
    return (
        <div className="id-card">
            <div className="card">
                <div className="img-avatar">
                    <img src="/kontakt_avatar.png" />
                </div>
                <div className="card-text">
                    <div className="portada">
                        <img src="/kontakt_background.png" />
                    </div>
                    <div className="title-total">   
                        <div className="title">
                            Programátor / Reseller / Gamer
                        </div>
                        <h2>LukiS</h2>
                        <div className="desc">
                            Už to bude 10 rokov čo programujem,
                            aktuálne chodím na vysokú školu (aplikovaná informatika).
                            Resellujem repy a aktuálne hrávam hlavne Apex Legends,
                            ked tak niekedy aj CS2, Fortnite a kľudne aj Minecraft.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialCards = () => {
    return (
        <div className="social-cards">
            <ul> 
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-discord">
                        <img src="/icons/discord.svg" />
                    </span>
                </a> 
                </li>
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-tiktok"></span>
                </a> 
                </li>
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-twitter"></span>
                </a> 
                </li>
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-instagram"></span>
                </a> 
                </li>
            </ul>  
        </div> 
    );
};

const Animation = () => {
    return (
        <></>
    );
}

const Kontakt = () => {
    return (
        <div className="kontakt">
            <Navbar active="kontakt" />
            <Animation />
            <KontaktCard />
            <SocialCards />
            <BottomBar />
        </div>
    );
};

export default Kontakt;