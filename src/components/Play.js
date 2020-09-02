
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
      <div className="play">
        <h1>Select a pet to play</h1>
      </div>

    );
  } else {

    return (
      //include pet description and name

      <div className="play">
        <h1>
          {playPet.name}
        </h1>
        <div className="pictures">

          <img src={playPet.image}></img>
        </div>
  This is the play component
        <div className="buttons">
          <meter id="meter_love">
          </meter>
          <span></span>

          <button className="myButton" onClick={() => playTime()}>Play</button>
          <meter id="meter_play">
          </meter>
          <span></span>
          <button className="myButton" onClick={() => feed()}> Feed</button>
          <meter id="meter_love">
          </meter>
          <span></span>
          <button className="myButton" onClick={() => nap()}> Nap</button>
          <meter id="meter_love">
          </meter>
          <span></span>
          <button className="myButton" onClick={() => love()}> Give love</button>

        </div>
      </div >
    )
  }

}

export default Play
