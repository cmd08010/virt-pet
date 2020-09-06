import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Add from './components/Add'
import Gallery from './components/Gallery'
import About from './components/About'
import Play from './components/Play'
import './App.css';
import axios from "axios"
import { createStore } from "redux"
import { create } from 'lodash';

function App() {

  const store = createStore(() => { })

  const [pets, setPets] = useState([])
  const [users, setUsers] = useState([])
  const [nameclass, setNameclass] = useState('')
  const [params, setParams] = useState('')
  const [petImage, setPetImage] = useState('')
  const [pet, setPet] = useState([])

  //add chat bot with chat with dog


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


  return (
    <div className="App">

      <Router>
        <div>
          <div id="nav-bar">
            <nav className="nav-bar-links">
              <Link className="link" to="/">
                Home
              </Link>
              <Link className="link" to="/add">
                Add a pet!
                </Link>
              <Link className="link" to="/gallery">
                Choose a new pet!
                </Link>
              <Link className="link" to="/about">
                About
                </Link>
            </nav>
            <div>
            </div>

          </div>

          <Switch>
            <Route path="/" exact={true}>
              <Home
                pet={pet}
                setPet={setPet}
                pets={pets}
              />
            </Route>
          </Switch>
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
          </Switch>
          <Switch>
            <Route path="/gallery">
              <Gallery
                pet={pet}
                setPet={setPet} />
            </Route>
          </Switch>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
          <Switch>
            <Route path="/play">
              <Play
                pet={pet}
                setPet={setPet}
              />
            </Route>
          </Switch>
        </div>
      </Router>

    </div >
  );
}

export default App;
