import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Home = ({ pet, setPet }) => {



  return (
    <div className="home">
      <p>

      </p>
      <div className="pictures">

        <div className="left-picture">
          <Link to="/play" onClick={() => setPet("Woodley")}>
            <img src="https://i.imgur.com/Y0q6OiD.jpg?1" alt="Avatar" className="image" ></img>

            <div className="middle">
              <div className="text">
                <h2>
                  Meet Woodley

               </h2>
               Click on this cutie to play with her!
            </div>
            </div>
          </Link>
        </div>
        <div className="right-picture">
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
        </div>
      </div>
    </div >
  );
}


export default Home
