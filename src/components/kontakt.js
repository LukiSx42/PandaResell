import React from "react";
import '../style/kontakt.css';
import Navbar from './navbar';
import BottomBar from './bottom';
import Popup from 'reactjs-popup';

const KontaktCard = () => {
    return (
        <div className="id-card">
            <div className="kontakt-card">
                <div className="img-avatar">
                    <img src="/kontakt_avatar.png" />
                </div>
                <div className="card-text">
                    <div className="portada">
                        <img src="/kontakt_background.jpg" />
                    </div>
                    <div className="title-total">   
                        <div className="title">
                            Programátor / Reseller
                        </div>
                        <h2>LukiS</h2>
                        <div className="desc">
                            Už to bude 10 rokov čo programujem,
                            aktuálne chodím na vysokú školu (aplikovaná informatika),
                            predávam repy.
                            <br />
                            <br />
                            Email: <b>fantazia.reps@gmail.com</b>
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
                <li key="cards-1">
                <Popup trigger={
                    <a>
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/discord.svg" />
                        </span>
                    </a> 
                }
                position="bottom center">
                    <div className="discord-popup">
                        <b>lukis.eth</b>
                    </div>
                </Popup>
                </li>
                <li key="cards-2">
                    <a href="https://twitter.com/LukiS_eth" target="_blank">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/xlogo.svg" />
                        </span>
                    </a>
                </li>
                <li key="cards-3">
                    <a href="/telegram.jpg" target="_blank">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/telegram.svg" />
                        </span>
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