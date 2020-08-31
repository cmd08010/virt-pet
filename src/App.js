import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Add from './components/Add'
import Gallery from './components/Gallery'
import About from './components/About'
import Play from './components/Play'
import './App.css';

function App() {

  const [pet, setPet] = useState([])

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
          </div>

          <Switch>
            <Route path="/" exact={true}>
              <Home
                pet={pet}
                setPet={setPet} />
            </Route>
          </Switch>
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
          </Switch>
          <Switch>
            <Route path="/gallery">
              <Gallery />
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
      <div id="creator-link">
        <a
          className="App-link"
          href="https://colleendunion.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the creator
      </a>
      </div>
    </div >
  );
}

export default App;
