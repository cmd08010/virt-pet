
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';

const Play = ({ pet, setPet }) => {

  //show name up top and short description
  //show picture and then four buttons and little level bars as you click each button - animate so for hearts it will have hearts pop up and for food bones will pop up
  //then once you hit the top love level it will switch pictures and an alert will say name is too tired, full, once you hit the highest love level it will jhave heart fireworks
  //also it will decrease over time

  console.log(pet)

  const [playPet, setPlayPet] = useState([])
  const [play, setPlay] = useState(20)
  const [tired, setTired] = useState(20)
  const [hunger, setHunger] = useState(20)
  const [hearts, setHearts] = useState(20)
  const [animate, setAnimate] = useState("")


  useEffect(() => {
    axios.get(`/api/pets/${pet}`)
      .then(response => setPlayPet(response.data[0]))
  }, [])

  const playTime = () => {
    //get dog playlevel
    //click button and add play level
    // once hit max change picture to tired picture
    // popup once hit max level
    setPlay(play + 20)

  }

  const hungerLevel = () => {

    if (hunger >= 240) {
      setAnimate("")

    } else {
      setHunger(hunger + 20)
      console.log(hunger)

    }
  }
  const tiredLevel = () => {
    setTired(tired + 20)
  }
  const heartsLevel = () => {
    if (hearts >= 240) {
      setAnimate("heart")
      setTimeout(() => setAnimate(""), 3000)
    }
    setHearts(hearts + 20)
  }


  if (!playPet) {

    return (
      <div classNameName="play">
        <h1>Select a pet to play</h1>
      </div>

    );
  } else {

    return (
      //include pet description and name

      <div className="play">
        <div className="animations">

          <div id={animate}>
          </div>
          <div id={animate}>
          </div>
          <div id={animate}>
          </div>
        </div>
        <h1>
          {playPet.name}
        </h1>
        <div className="pictures">
          <div className="picture">
            <img src={playPet.image} alt="avatar" className="image-nohover" ></img>

          </div>
        </div>
        <div className="progress-bars">
          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={play} aria-valuemin="0" aria-valuemax="100" style={{ width: play }}>
            </div>
          </div>
          <button classNameName="myButton" onClick={() => playTime()}> Play</button>
        </div>

        <div className="progress-bars">
          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={hunger} aria-valuemin="0" aria-valuemax="100" style={{ width: hunger }}>
            </div>
          </div>
          <button classNameName="myButton" onClick={() => hungerLevel()}> Feed</button>
        </div>
        <div className="progress-bars">
          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={tired} aria-valuemin="0" aria-valuemax="100" style={{ width: tired }}>
            </div>
          </div>
          <button classNameName="myButton" onClick={() => tiredLevel()}> Nap</button>
        </div>
        <div className="progress-bars">
          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={hearts} aria-valuemin="0" aria-valuemax="100" style={{ width: hearts }}>
            </div>
          </div>
          <button classNameName="myButton" onClick={() => heartsLevel()}> Love</button>
        </div>
      </div >



    )
  }

}

export default Play
