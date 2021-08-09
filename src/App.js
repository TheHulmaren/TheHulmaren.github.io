import logo from './logo.svg';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './scripts/Header.js'
import './scripts/MovieSelection.js'

import Header from './scripts/Header.js';
import MovieSelection from './scripts/MovieSelection.js';
import Ticketing from './scripts/Ticketing';
import Checkout from './scripts/Checkout';
import { MovieContext } from './scripts/MovieContext';


function App() {

  const [movieSelected, setMovieSelected] = useState(localStorage.getItem("movieSel") == null ? 0: JSON.parse(localStorage.getItem("movieSel")))
  const [cinemaSelected, setCinemaSelected] = useState(localStorage.getItem("cinemaSel") == null ? 0: JSON.parse(localStorage.getItem("cinemaSel")))
  const [checkoutData, setCheckoutData] = useState(localStorage.getItem("checkoutData") == null ? 'adasd': JSON.parse(localStorage.getItem("checkoutData")))



  function toggleMovieSelected(m) {
    setMovieSelected(m)
    localStorage.setItem("movieSel",JSON.stringify(m))
    
  }

  function toggleCinemaSelected(c) {
    setCinemaSelected(c)
    localStorage.setItem("cinemaSel",JSON.stringify(c))
  }

  function toggleCheckoutData(c){
    setCheckoutData(c)
    localStorage.setItem("checkoutData",JSON.stringify(c))
  }

  const value = { movieSelected, cinemaSelected, checkoutData, toggleMovieSelected, toggleCinemaSelected, toggleCheckoutData }

  return (

    <MovieContext.Provider value={value}><div className="bg-dark">
          <Header />
          
      <Router>
        
          <Switch>
            <Route exact path="/">
              <MovieSelection />
              
            </Route>
            <Route path="/ticketing">

              <Ticketing />

            </Route>
            <Route path="/checkout">
              <Checkout/>
            </Route>
          </Switch>

       
      </Router> </div>
    </MovieContext.Provider>





  );
}

export default App;
