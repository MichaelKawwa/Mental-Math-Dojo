import './App.css';
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';

import Menu from './Menu.js'

const Multiplication = () => {
  const [currentQuestions, setQuestions] = useState(0);
  const [currentScore, setScore] = useState(0);
  const timerId = useRef(0);
  const input = useRef(''); 
  const questions = [];
  let times = [];
  let totalTime = 0;


  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Counter() {
    const [count, setCount] = useState(0);
    
  
    useInterval(() => {
      // Your custom logic here
      setCount(count + 1);
      timerId.current = count + 1
    }, 1000);
  
    return count
  }
  
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    const intervalId = useRef(null);
    const [currentDelay, setDelay] = useState(delay);
  
    const toggleRunning = useCallback(
      () => setDelay(currentDelay => (currentDelay === null ? delay : null)),
      [delay]
    );
  
    const clear = useCallback(() => clearInterval(intervalId.current), []);
  
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    
    if (intervalId.current) clear();
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function Example() {
  let totalTime = parseInt(sessionStorage.getItem("previousTime"))
    return (
      <>
 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Round Over, Great Job!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Total Time: {totalTime} seconds, 
           Category: Multiplication, 
           Average Time Per Question: {totalTime/questions.length} seconds
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
            <Link to="/">Done</Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  
class questionFormat {
  constructor() {
    this.number1 = 1;
    this.number2 = 10;
  }
}
  for (let index = 0; index < 10; index++) {
    var newQuestion = new questionFormat()
    const max = 100
    const min = 1
    newQuestion.q1 = Math.floor(Math.random() * (max - min + 1) + min)
    newQuestion.q2 = Math.floor(Math.random() * (max - min + 1) +min)
   const a = newQuestion.q1*newQuestion.q2
    questions.push(newQuestion)
  };
  
  function addEntry() {
    // parse any JSON previously stored in All entries
    var existingEntrees = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntrees == null) existingEntrees = [];
    var totalTime = parseInt(sessionStorage.getItem("previousTime"))

    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;   
    
    var category = 'Multiplication'
    var avgTime = totalTime/questions.length

    var entry = {
      "date": today,
      "category": category,
      "average time": avgTime
    };

    localStorage.setItem("entry", JSON.stringify(entry))
    existingEntrees.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntrees));
    console.log(entry)
  }
  
  const handleChange = (event) => {
    event.preventDefault();

    input.current = event.target.value
    const nextQuestion = currentQuestions + 1
    if (questions[currentQuestions].q1*questions[currentQuestions].q2 == input.current) {
      times.push(timerId.current)
      var previous = parseInt(sessionStorage.getItem("previousTime")) 
      if (isNaN(previous)) previous = 0;
      var currentTime = previous + timerId.current
      sessionStorage.setItem("previousTime", currentTime)
      console.log(currentTime)
    if (nextQuestion < questions.length) {
      document.getElementById('myInput').value = ""
      setQuestions(currentQuestions + 1)
      setScore(currentScore + 1)
     }  else {
      console.log("round over!") 
      console.log(`total time: ${currentTime}`)
      addEntry()
      handleShow()
     }
    }  
  };
  
  return (
    <div className="App">
      <Example/>
      <h1>Time Passed: {<Counter/>}</h1>
      <h1 className="question-section">Score: {currentScore}</h1>
      <div className="question-section">
      <div className="question-text">{`${questions[currentQuestions].q1} × ${questions[currentQuestions].q2} =`}</div>
      </div>
      <div className="anwser-section">
          <input id="myInput" type="text" onChange={handleChange}  />
      </div>
    </div>
  );

}

export default Multiplication;

