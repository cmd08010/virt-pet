import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



const Home = ({ pet, setPet, pets }) => {



  // useEffect(() => {

  //   axios.get('/api/pets')
  //     .then(response => {
  //       setPets(response.data)
  //       return response.data
  //     })
  //     .then(results => console.log(results, "useeffect in Home"))
  //   // .then((results) => {
  //   //   setPets(results[0])
  //   //   setUsers(results[1])
  //   // })
  // }, [])

  return (
    <div className="home">

      <h2>Welcome to your virtual pet! Have fun playing with, feeding, giving love, and letting your new pet nap!
        Select a pet to get started!</h2>

      <div className="pictures">

        {pets.slice(0, 2).map((dog => {
          console.log(dog)
          return (
            <div className="picture" key={dog.id}>

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
            </div>
          )
        }))}

        {/* <div className="right-picture">
          <Link to="/play" onClick={() => setPet("Bridges")}>
            <img src="https://i.imgur.com/EzMJmh4.jpg?1" alt="" className="image"></img>
            <div className="middle">
              <div className="text">
                <h2>
                  Meet Bridges
                </h2>
                Click on this cutie to play with her!
            </div>
            </div>
          </Link>
        </div> */}
      </div>
    </div >
  );
}


export default Home
