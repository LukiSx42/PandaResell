import './home.css';

function Home() {
  return (
    <div className="home">
      <h1>Fantázia Reps</h1>
      <div className="cards">
        <div class="container">
          <div class="box">
            <span></span>
            <div class="content">
              <h2>???</h2>
              <p style={{ fontFamily: 'Helvetica'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" id="cardBtn1">Read More</a>
            </div>
          </div>
          <div class="box">
            <span></span>
            <div class="content">
              <h2>Itemy</h2>
              <p style={{ fontFamily: 'Helvetica'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" id="cardBtn2">Read More</a>
            </div>
          </div>
          <div class="box">
            <span></span>
            <div class="content">
              <h2>Kontakt</h2>
              <p style={{ fontFamily: 'Helvetica'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" id="cardBtn3">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
