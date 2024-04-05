import '../style/home.css';
import Navbar from './navbar';
import BottomBar from './bottom';
import {useRef} from 'react';

let ref;

function HomeCards() {
  ref = useRef(null);
  const scrollToItems = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="cards">
      <div className="container">
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Info 📖</h2>
            <p style={{ fontFamily: 'Helvetica'}}>
              Rýchly návod ako si vybrať produkty, ako objednať, aký je pustup, kedy ich dostaneš...
            </p>
            <a href="/info">📖 📖 📖</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Shop 🔥</h2>
            <p style={{ fontFamily: 'Helvetica'}}>
              Samotný shop kde vieš prehľadávať produkty, zoraďovať podľa typu / značky / ceny produktu.
            </p>
            <a href="#" onClick={ scrollToItems }>🔥 🔥 🔥</a>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content">
            <h2>Kontakt 📞</h2>
            <p style={{ fontFamily: 'Helvetica'}}>
              Nenašiel si to čo si hladal?
              Chceš si niečo objednať?
              <br /> Máš nejaké iné otázky?
              <br /> Kontaktuj nás!
            </p>
            <a href="/kontakt" id="btnBlack">📞 📞 📞</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeItems() {
  return (
    <div className="section-fluid-main" ref={ ref }>
      <div className="section-row">
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop?filter=T-Shirt"; } }>
              <img src="/tricka.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Tričká</h2>
        </div>
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop?filter=Shoes"; } }>
              <img src="/topanky.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Topánky</h2>
        </div>
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop?filter=Hoodie+Sweater"; } }>
              <img src="/mikiny_svetre.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Mikiny + Svetre</h2>
        </div>
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop?filter=Jacket"; } }>
              <img src="/vetrovky.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Vetrovky</h2>
        </div>
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop?filter=Pants"; } }>
              <img src="/nohavice.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Nohavice</h2>
        </div>
        <div className="section-col">
          <div className="section">
            <div className="section-in" onClick={ () => { window.location.href = "/shop"; } }>
              <img src="/vsetko.png" alt="" />
            </div>
          </div>
        </div>
        <div className="hover-text">
          <h2>Všetky Produkty</h2>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="content" id="homeTitleBox">
          <h2 className="text3d" id="homeTitle">Fantázia Reps™️</h2>
        </div>
        <HomeCards />
        <div className="neonBody">
          <h1 className="neonTitle">Shop</h1>
        </div>
        <HomeItems />
      </div>
      <BottomBar />
    </div>
  );
}

export default Home;
