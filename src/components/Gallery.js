import React, { useState, useEffect, Suspense } from 'react';
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
    // .then((results) => {
    //   setPets(results[0])
    //   setUsers(results[1])
    // })
  }, [params])
  if (pets) {
    return (
      <div className="gallery">
        {pets.map(dog => {
          return (
            <div className="gallery-picture">

              <Link to="/play" onClick={() => setPet(dog.id)}>
                <img src={dog.image} alt="Avatar" className="image" ></img>
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
    )
  } else {
    return (
      <div>
        See all the pets
      </div>
    )
  }
}


export default Gallery
