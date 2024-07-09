import blankParchment from "../assets/homePageImages/blankParchment.jpg";
import dragon from "../assets/homePageImages/dragon.jpg";
import fireball from "../assets/homePageImages/fireball.jpg";
import kraken from "../assets/homePageImages/kraken.jpg";
import diceBook from "../assets/homePageImages/diceBook.jpg";
import fireDice from "../assets/homePageImages/fireDice.jpg";
import diceMap from "../assets/homePageImages/diceMap.jpg";

export default function Home() {
  return (
    <>
      <div className="row d-flex justify-content-evenly align-items-center pt-4">
        <div className="col-lg-3 col-12">
          <div className="col-12 d-flex justify-content-center mb-2">
            <img src={dragon} className="sideImage"></img>
          </div>
          <div className="col-12 d-flex justify-content-center mb-2">
            <img className="sideImage" src={diceBook}></img>
          </div>
          <div className="col-12 mb-2 d-flex justify-content-center">
            <img src={kraken} className="sideImage"></img>
          </div>
        </div>

        <div className="col-lg-6 col-9 d-flex justify-content-center align-items-center">
          <img className="mainHomeImage" src={diceMap}></img>
        </div>

        <div className="col-lg-3 col-12">
          <div className="col-12 d-flex justify-content-center mb-2 mt-2">
            <img src={fireDice} className="sideImage"></img>
          </div>
          <div className="col-12 d-flex justify-content-center mb-3">
            <img className="sideImage" src={fireball}></img>
          </div>
        </div>
      </div>
    </>
  );
}
