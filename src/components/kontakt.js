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
                    <img src="/kontakt_avatar.png" alt="Avatar" />
                </div>
                <div className="card-text">
                    <div className="portada">
                        <img src="/kontakt_background.jpg" alt="Background" />
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
                    <a href="#">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/discord.svg" alt="Discord" />
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
                    <a href="https://twitter.com/LukiS_eth" rel="noreferrer" target="_blank">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/xlogo.svg"  alt="X" />
                        </span>
                    </a>
                </li>
                <li key="cards-3">
                    <a href="/telegram.jpg" rel="noreferrer" target="_blank">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span className="fa">
                            <img src="/icons/telegram.svg" alt="Telegram" />
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