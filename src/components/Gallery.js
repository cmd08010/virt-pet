import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios"


const Gallery = ({ pet, setPet }) => {

  const [params, setParams] = useState({})
  const [pets, setPets] = useState([])

  useEffect(() => {
    axios.get('/api/pets')
      .then(response => {
        setPets(response.data)
        return response.data
      })
      .then(results => console.log(results, "useeffect in app"))

  }, [params])

  if (pets) {
    return (
      <Fragment>
        <h2>
          View all our awesome pets! If you want you can also add to our gallery!
        </h2>
        <div className="gallery">
          {pets.map(dog => {
            return (
              <div className="picture">
                <Link to="/play" onClick={() => setPet(dog.id)}>
                  <img src={dog.image} alt="Avatar" className="image"></img>
                  <div className="middle">
                    <div className="text">
                      <h2>
                        {dog.name}
                      </h2>
                    Click on this cutie to play!
                     </div>
                  </div>
                </Link>
              </div >
            );
          })
          }
        </div >

      </Fragment >
    )
  } else {
    return (
      <div className="gallery">
        Try refreshing!
      </div>
    )
  }
}


export default Gallery
