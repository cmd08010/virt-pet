
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';

const Play = ({ pet, setPet }) => {

  //show name up top and short description
  //show picture and then four buttons and little level bars as you click each button - animate so for hearts it will have hearts pop up and for food bones will pop up
  //then once you hit the top love level it will switch pictures and an alert will say name is too tired, full, once you hit the highest love level it will jhave heart fireworks
  //also it will decrease over time

  console.log(pet)

  const [playPet, setPlayPet] = useState([])
  const [play, setPlay] = useState([])
  const [tired, setTired] = useState([])
  const [hunger, setHunger] = useState([])
  const [hearts, setHearts] = useState([])


  useEffect(() => {
    axios.get(`/api/pets/${pet}`)
      .then(response => setPlayPet(response.data[0]))
  }, [])

  const playTime = () => {
    //get dog playlevel
    //click button and add play level
    // once hit max change picture to tired picture
    // popup once hit max level

  }

  const feed = () => {
    //get dog hunger level
    //click button and add play level
    // once hit max change picture to tired picture
    // popup once hit max level
  }
  const nap = () => { }
  const love = () => { }


  if (!playPet) {

    return (
      <div classNameName="play">
        <h1>Select a pet to play</h1>
      </div>

    );
  } else {

    return (
      //include pet description and name

      <div classNameName="play">
        <h1>
          {playPet.name}
        </h1>
        <div classNameName="pictures">

          <img src={playPet.image}></img>
        </div>
  This is the play component
        <div classNameName="buttons">
          <meter id="meter_love">
          </meter>
          <span></span>

          <button classNameName="myButton" onClick={() => playTime()}>Play</button>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 1000 }} >
              <span className="sr-only">60% Complete</span>
            </div>
          </div>
          <span></span>
          <button classNameName="myButton" onClick={() => feed()}> Feed</button>
          <meter id="meter_love">
          </meter>
          <span></span>
          <button classNameName="myButton" onClick={() => nap()}> Nap</button>
          <meter id="meter_love">
          </meter>
          <span></span>
          <button classNameName="myButton" onClick={() => love()}> Give love</button>

          <div className="progress">
            <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: 40 }}>
              <span className="sr-only">40% Complete (success)</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: 20 }}>
              <span className="sr-only">20% Complete</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 60 }}>
              <span className="sr-only">60% Complete (warning)</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: 100 }}>
              <span className="sr-only">80% Complete (danger)</span>
            </div>
          </div>

        </div>
      </div >
    )
  }

}

export default Play
