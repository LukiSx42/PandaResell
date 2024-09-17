import React from "react";
import '../style/info.css';
import Navbar from './navbar';
import BottomBar from './bottom';

const InfoCards = () => {
    return (
        <div className="infoCards">
            <div className="header">
                <h1>
                    Nájdeš tu&nbsp;<span className="typewriter"></span>
                </h1>
                <h1>Informácie o Fantázia Reps</h1>
                <p>Toto je približný opis postupu, ktorého sa držíme pri objednávkach.</p>
            </div>
            <div className="row1-container">
                <div className="infoBox infoBox-down cyan">
                <img src="https://freeiconshop.com/wp-content/uploads/edd/search-var-flat.png" alt="" />
                <h2>1. Nájsť Produkt 🔍</h2>
                    <p>
                        Najprv si treba nájsť produkty v tomto shope, alebo aj na reddite
                        <a href="https://www.reddit.com/r/FashionReps/" rel="noreferrer" target="_blank"> (r/FashionReps)</a>.
                        Ak vieš čo presne chceš, pokojne nás kontaktuj a my ti daný produkt nájdeme.
                    </p>
                </div>
            
                <div className="infoBox red">
                    <img src="https://cdn-icons-png.flaticon.com/512/628/628748.png" alt="" />
                    <h2>2. Objednať 🛍️</h2>
                    <p>
                        Objednávky prímame zatiaľ len manuálne (treba nás
                        <a href="/kontakt"> kontaktovať</a>). Platí sa samozrejme za daný item + za poštovné (poštovné je veľmi drahé).
                    </p>
                </div>
            
                <div className="infoBox infoBox-down blue">
                    <img src="https://cdn.icon-icons.com/icons2/1859/PNG/512/camerafront_117938.png" alt="" />
                    <h2>3. Kontrola Kvality 📷</h2>
                    <p>Po danom čase, keď produkt bude prirpavený na odoslanie, tak ti pošleme veľmi kvalitné fotky (8k). Z ktorých nám dáš vedieť či je všetko v poriadku, prípadne sa dá požiadať o iný kus alebo aj o vrátenie penazí.</p>
                </div>
            </div>
            <div className="row2-container">
                <div className="infoBox orange">
                    <img src="https://cdn-icons-png.flaticon.com/512/9037/9037060.png" alt="" />
                    <h2>4. Doručenie 🚚</h2>
                    <p>Keď budú všetky produkty pripravené, tak sa odošlú na Slovensko (väčšinou 2-3 týždne). Keď ich dostaneme, tak neni problém poslať poštou (platíš poštovné), alebo najlepšie balík osobne odovzdať.</p>
                </div>
            </div>
        </div>
    );
}

const InfoQuestions = () => {
    return (
        <div id="questions-list">
            <div className="info-questions float-left">
                <div className="bubble left">Akým spôsobom môžem zaplatiť? 💸</div>
                <div className="bubble right">Aktuálne prímame platby pomocou: crypto🪙, bankový prevod💳 a hotovosť💵.</div>
                <div className="bubble left">Kedy mám zaplatiť a ako?</div>
                <div className="bubble right">Záleží na objednávke 📦, detaily sa dohodujú individuálne. 👍</div>
            </div>
            <div className="info-questions float-right">
                <div className="bubble left">Čo ak mi príde produkt poškodený? 💎 Je možnosť vrátenia penazí? 💸</div>
                <div className="bubble right">Áno, samozrejme, ak by vám prišiel produkt poškodený, tak neni problém vrátenia penazí. 👍</div>
                <div className="bubble left">Čo ak sa balík náhodou stratí cestou na Slovensko? 😳</div>
                <div className="bubble right">Aj v tomto prípade neni problém vrátenia penazí. 💸</div>
            </div>
            <div className="info-questions">
            <div className="bubble left">Ako funguje poštovné 🚚? Koľko to stojí 💸 keď si chcem objednať 2 tričká?</div>
                <div className="bubble right">Poštovné 🚚 cca za jedno tričko je 10-15€, ale keď budeš objednávať tak ti vopred povieme presnú cenu koľko by ta to stálo.</div>
                <div className="bubble left">A kedy to dostanem? 📅</div>
                <div className="bubble right">Záleží koľko budeme mať objednávok v daný čas, ale väčšinou do 3-4 dní dostaneš fotky 📷. Potom cca 2 týždne kým to príde na Slovensko. 📦</div>
            </div>
        </div>
        
    );
};

const Info = () => {
    return (
        <div>
            <Navbar active="info" />
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