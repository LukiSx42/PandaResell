import React from "react";
import '../style/info.css';
import Navbar from './navbar';
import BottomBar from './bottom';

const InfoCards = () => {
    return (
        <div className="infoCards">
            <div className="header">
                <h1>
                    Nájdeš tu&nbsp;<span class="typewriter"></span>
                </h1>
                <h1>Informácie o Fantázia Reps</h1>
                <p>Toto je približný opis postupu, ktorého sa držím pri objednávkach.</p>
            </div>
            <div className="row1-container">
                <div className="infoBox infoBox-down cyan">
                <h2>1. Nájsť item 🔍</h2>
                    <p>
                        Najprv si treba nájsť item/itemy v tomto shope, alebo aj na reddite
                        <a href="https://www.reddit.com/r/FashionReps/" target="_blank"> (r/FashionReps)</a>.
                        Ak vieš čo presne chceš, pokojne ma kontaktuj a ja ti daný produkt nájdem.
                    </p>
                    <img src="https://freeiconshop.com/wp-content/uploads/edd/search-var-flat.png" alt="" />
                </div>
            
                <div className="infoBox red">
                    <h2>2. Objednať 🛍️</h2>
                    <p>
                        Objednávky prímam zatiaľ len manuálne (treba ma
                        <a href="/kontakt"> kontaktovať</a>). Platí sa samozrejme za daný item + za shipping z číny (kďe sa nachádzajú výrobne repov).
                    </p>
                    <img src="https://cdn-icons-png.flaticon.com/512/628/628748.png" alt="" />
                </div>
            
                <div className="infoBox infoBox-down blue">
                    <h2>3. Kontrola Kvality 📷</h2>
                    <p>Po danom čase, keď item bude prirpavený na odoslanie, tak ti pošlem veľmi kvalitné fotky (8k). Z ktorých mi dáš vedieť či je všetko v poriadku, prípadne sa dá požiadať o iný kus alebo aj o vrátenie penazí.</p>
                    <img src="https://cdn.icon-icons.com/icons2/1859/PNG/512/camerafront_117938.png" alt="" />
                </div>
            </div>
            <div className="row2-container">
                <div className="infoBox orange">
                    <h2>4. Doručenie 🚚</h2>
                    <p>Keď budú všetky itemy pripravené, tak sa odošlú na Slovensko (väčšinou 1-2 týždne). Keď ich dostanem, tak neni problém poslať poštou (platíš poštovné), alebo najlepšie osobne odovzdať itemy.</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/9037/9037060.png" alt="" />
                </div>
            </div>
        </div>
    );
}

const InfoQuestions = () => {
    return (
        <div id="questions-list">
            <div className="info-questions float-left">
                <div className="bubble left">Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless. Schraeder drop gondy, rail fatty slash gear jammer steeps</div>
                <div className="bubble right">Ok, Thank you</div>
                <div className="bubble left"> ut labore et dolore magna </div>
                <div className="bubble right">👌</div>
            </div>
            <div className="info-questions float-right">
                <div className="bubble left">Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless. Schraeder drop gondy, rail fatty slash gear jammer steeps</div>
                <div className="bubble right">Ok, Thank you</div>
                <div className="bubble left"> ut labore et dolore magna </div>
                <div className="bubble right">👌</div>
            </div>
            <div className="info-questions">
                <div className="bubble left">Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless. Schraeder drop gondy, rail fatty slash gear jammer steeps</div>
                <div className="bubble right">Ok, Thank you</div>
                <div className="bubble left"> ut labore et dolore magna </div>
                <div className="bubble right">👌</div>
            </div>
        </div>
        
    );
};

const Info = () => {
    return (
        <div>
            <Navbar />
            <div className="info">
                <InfoCards />
                <h1 id="questions-title">
                    Časté Otázky
                </h1>
                <InfoQuestions />
            </div>
            <BottomBar />
        </div>
    );
};

export default Info;