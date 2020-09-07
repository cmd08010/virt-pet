
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Animated } from "react-animated-css";

const Play = ({ pet, setPet }) => {

  //show name up top and short description
  //show picture and then four buttons and little level bars as you click each button - animate so for hearts it will have hearts pop up and for food bones will pop up
  //then once you hit the top love level it will switch pictures and an alert will say name is too tired, full, once you hit the highest love level it will jhave heart fireworks
  //also it will decrease over time


  const [playPet, setPlayPet] = useState([])
  const [play, setPlay] = useState(20)
  const [tired, setTired] = useState(20)
  const [hunger, setHunger] = useState(20)
  const [hearts, setHearts] = useState(20)
  const [animate, setAnimate] = useState("")
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    axios.get(`/api/pets/${pet}`)
      .then(response => setPlayPet(response.data[0]))
  }, [pet])

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
      if (hearts >= 120) {
        setHearts(20)
      } else if (hunger >= 120) {
        setHunger(20)
      } else if (tired >= 120) {
        setTired(20)
      } else if (play >= 120) {
        setPlay(20)
      }
    }, 3000)
  }, [visible])

  const playLevel = () => {
    //get dog playlevel
    //click button and add play level
    // once hit max change picture to tired picture
    // popup once hit max level
    setPlay(play + 20)

  }

  const hungerLevel = () => {
    if (hunger <= 100) {
      setHunger(hunger + 20)
      console.log(hunger)
    } else {
      setAnimate("")
    }
  }
  const tiredLevel = () => {
    setTired(tired + 20)
  }

  const heartsLevel = () => {
    if (hearts <= 100) {
      setHearts(hearts + 20)
    }

  }


  if (!playPet) {

    return (
      <div classNameName="play">
        <h1>Select a pet to play</h1>
      </div>

    );
  } else {

    //include pet description and name
    return (
      <div className="play">
        <h1>
          {playPet.name}
        </h1>
        <div className="pictures">
          <div className="picture-play">
            <img src={playPet.image} alt="avatar" className="image-nohover" ></img>
          </div>
          {hearts >= 120 ? (<Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={visible}>
            <div>
              <img src="https://pngimg.com/uploads/heart/heart_PNG51342.png" alt="pic" style={{ width: 100 }}></img>
              <img src="https://pngimg.com/uploads/heart/heart_PNG51342.png" alt="pic" style={{ width: 100 }}></img>
              <img src="https://pngimg.com/uploads/heart/heart_PNG51342.png" alt="pic" style={{ width: 100 }}></img>
            </div>
          </Animated>) : null}
          {tired >= 120 ? (<Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={visible}>
            <div>
              <img src="https://i.pinimg.com/originals/17/b1/67/17b1675d6c2e378254d3e4d570ffe7a2.jpg" alt="pic"></img>
            </div>
          </Animated>) : null}
          {hunger >= 120 ? (<Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={visible}>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJV7BxQdQPnc2wwL0YsqXJnxfE9lCSdn13jw&usqp=CAU" alt="pic"></img>
            </div>
          </Animated>) : null}
          {play >= 120 ? (<Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={visible}>
            <div>
              <img src="https://image.shutterstock.com/image-photo/tennis-ball-on-white-background-260nw-665965660.jpg" alt="pic"></img>
            </div>
          </Animated>) : null}
        </div>
        <div className="bars">
          <ProgressBar variant="success" now={hunger} style={{ width: 300 }} />
          <button className="myButton" onClick={hungerLevel}> Feed</button>
        </div>

        <div className="bars">
          <ProgressBar variant="success" now={hearts} style={{ width: 300 }} />
          <button className="myButton" onClick={() => heartsLevel()}> Give love</button>
        </div>
        <div className="bars">
          <ProgressBar variant="success" now={tired} style={{ width: 300 }} />
          <button className="myButton" onClick={tiredLevel}> Nap</button>
        </div>
        <div className="bars">
          <ProgressBar variant="success" now={play} style={{ width: 300 }} />
          <button className="myButton" onClick={playLevel}> Play</button>


          {/* </div>
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
      </div > */}
        </div>
      </div>


    )
  }

}

export default Play
