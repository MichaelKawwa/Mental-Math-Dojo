import React, { Component } from 'react';
import './App.css';

import {
  Route,
  Link,
  Routes,
} from 'react-router-dom';

import Menu from './Menu';
import Multiplication from './Multiplication';
import Division from './Division';
import Addition from './Addition';
import Subtraction from './Subtraction';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Mental Math Dojo</h1>
        </header>
        <img class="images" src="https://img.icons8.com/cute-clipart/50/000000/multiply.png"/>
          <img class="images" src="https://img.icons8.com/cute-clipart/64/000000/divide.png"/>
          <img class="images" src="https://img.icons8.com/cute-clipart/64/000000/minus-math.png"/>
          <img class="images" src="https://img.icons8.com/cute-clipart/64/000000/plus-math.png"/>
        <div className="App-intro">
          <Routes>
          <Route path='/' element={<Menu/>} />          
          <Route path='/multiplication' element={<Multiplication/>} />      
          <Route path='/division' element={<Division/>} />      
          <Route path='/addition' element={<Addition/>} />     
          <Route path='/subtraction' element={<Subtraction/>} /> 
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
