import './App.css';
import React, { useState, useRef } from "react";
import {Link} from 'react-router-dom';
import {Line, Bar} from 'react-chartjs-2';
import {months} from './Utils'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


import Multiplication from './Multiplication';
import { numberLiteralTypeAnnotation, identifier } from '@babel/types';
import { formatDate } from 'tough-cookie';
import { ConsoleWriter } from 'istanbul-lib-report';

const { faker } = require('@faker-js/faker');


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);  // date object handles the scenario where the year gets adjusted.
  const currentMonth = new Date();
  currentMonth.setMonth(currentMonth.getMonth());
  const prevMonth2 = new Date();
  prevMonth2.setMonth(prevMonth2.getMonth()-2);
  const labels = [prevMonth2.toLocaleDateString("en-us", { month: "long" }),previousMonth.toLocaleDateString("en-us", { month: "long" }),currentMonth.toLocaleDateString("en-us", { month: "long" })];

  const multiplicationArray = [];
  const divisionArray = [];
  const additionArray = [];
  const subtractionArray = [];

  const finalizedMultiplicationArray1 = [];
  const finalizedMultiplicationArray2 = [];
  const finalizedMultiplicationArray3 = [];

  var AvgMult1 = 0;
  var AvgMult2 = 0;
  var AvgMult3 = 0;

  var AvgDiv1 = 0;
  var AvgDiv2 = 0;
  var AvgDiv3 = 0;

  var AvgAdd1 = 0;
  var AvgAdd2 = 0;
  var AvgAdd3 = 0;

  var AvgSub1 = 0;
  var AvgSub2 = 0;
  var AvgSub3 = 0;


  const finalizedDivisionArray1 = [];
  const finalizedDivisionArray2 = [];
  const finalizedDivisionArray3 = []; 

  const finalizedAdditionArray1 = [];
  const finalizedAdditionArray2 = [];
  const finalizedAdditionArray3 = [];

  const finalizedSubtractionArray1 = [];
  const finalizedSubtractionArray2 = [];
  const finalizedSubtractionArray3 = [];

  function getData() {

    var data = localStorage.getItem("allEntries");
    var entry = JSON.parse(data)
    console.log(entry)
    for (var i = 0; i < entry.length; i++) {
    const category = entry[i].category
    switch(category) {
      case "Multiplication":
        multiplicationArray.push(entry[i])
        break;
      case "Division":
        divisionArray.push(entry[i])
        break;
      case "Addition":
        additionArray.push(entry[i])
      break;
      case "Subtraction":
       subtractionArray.push(entry[i])
      break;
      default:
        // code block
      }
    }

};

getData()

  function formatData() {
    // get dates for Multiplication 
    // check if date is either the current month or two months back, if not ignore them
    // group the dates from each month togethar and average them and, should return a finalized array of three values.

    for (var i = 0; i < multiplicationArray.length; i++) {
      var date = new Date(multiplicationArray[i].date)

      if (date.getMonth() == prevMonth2.getMonth()) {
        finalizedMultiplicationArray1.push(multiplicationArray[i]['average time'])
      } else if (date.getMonth() == previousMonth.getMonth()) {
        finalizedMultiplicationArray2.push(multiplicationArray[i]['average time'])
      } else if (date.getMonth() == currentMonth.getMonth()) {
        finalizedMultiplicationArray3.push(multiplicationArray[i]['average time'])
      }

      
      var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
      var longName = monthName(date)
    }

    for (var i = 0; i < divisionArray.length; i++) {
      var date = new Date(divisionArray[i].date)

      if (date.getMonth() == prevMonth2.getMonth()) {
        finalizedDivisionArray1.push(divisionArray[i]['average time'])
      } else if (date.getMonth() == previousMonth.getMonth()) {
        finalizedDivisionArray2.push(divisionArray[i]['average time'])
      } else if (date.getMonth() == currentMonth.getMonth()) {
        finalizedDivisionArray3.push(divisionArray[i]['average time'])
      }
      var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
      var longName = monthName(date)
    }

    for (var i = 0; i < additionArray.length; i++) {
      var date = new Date(additionArray[i].date)

      if (date.getMonth() == prevMonth2.getMonth()) {
        finalizedAdditionArray1.push(additionArray[i]['average time'])
      } else if (date.getMonth() == previousMonth.getMonth()) {
        finalizedAdditionArray2.push(additionArray[i]['average time'])
      } else if (date.getMonth() == currentMonth.getMonth()) {
        finalizedAdditionArray3.push(additionArray[i]['average time'])
      }
      var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
      var longName = monthName(date)
    }


    for (var i = 0; i < subtractionArray.length; i++) {
      var date = new Date(subtractionArray[i].date)

      if (date.getMonth() == prevMonth2.getMonth()) {
        finalizedSubtractionArray1.push(subtractionArray[i]['average time'])
      } else if (date.getMonth() == previousMonth.getMonth()) {
        finalizedSubtractionArray2.push(subtractionArray[i]['average time'])
      } else if (date.getMonth() == currentMonth.getMonth()) {
        finalizedSubtractionArray3.push(subtractionArray[i]['average time'])
      }
      var monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
      var longName = monthName(date)
    }

  }

  formatData()

  function finalizeData() {
    var tc1 = 0;
    var tc2 = 0;
    var tc3 = 0;

    var dtc1 = 0;
    var dtc2 = 0;
    var dtc3 = 0;
    
    var atc1 = 0;
    var atc2 = 0;
    var atc3 = 0;

    var stc1 = 0;
    var stc2 = 0;
    var stc3 = 0;

    for (var i = 0; i < finalizedMultiplicationArray1.length; i++) {
     var tc1 = tc1 + finalizedMultiplicationArray1[i]
    } 
    AvgMult1 = tc1/finalizedMultiplicationArray1.length

    for (var i = 0; i < finalizedMultiplicationArray2.length; i++) {
      var tc2 = tc2 + finalizedMultiplicationArray2[i]
     } 
     AvgMult2 = tc2/finalizedMultiplicationArray2.length

     for (var i = 0; i < finalizedMultiplicationArray3.length; i++) {
      var tc3 = tc3 + finalizedMultiplicationArray3[i]
     } 
     AvgMult3 = tc3/finalizedMultiplicationArray3.length


   for (var i = 0; i < finalizedDivisionArray1.length; i++) {
    var dtc1 = dtc1 + finalizedDivisionArray1[i]
   } 
   AvgDiv1 = dtc1/finalizedDivisionArray1.length

   for (var i = 0; i < finalizedDivisionArray2.length; i++) {
     var dtc2 = dtc2 + finalizedDivisionArray2[i]
    } 
    AvgDiv2 = dtc2/finalizedDivisionArray2.length

    for (var i = 0; i < finalizedDivisionArray3.length; i++) {
     var dtc3 = dtc3 + finalizedDivisionArray3[i]
    } 
    AvgDiv3 = dtc3/finalizedDivisionArray3.length

    for (var i = 0; i < finalizedAdditionArray1.length; i++) {
      var atc1 = atc1 + finalizedAdditionArray1[i]
     } 
     AvgAdd1 = atc1/finalizedAdditionArray1.length
  
     for (var i = 0; i < finalizedAdditionArray2.length; i++) {
       var atc2 = atc2 + finalizedAdditionArray2[i]
      } 
      AvgAdd2 = atc2/finalizedAdditionArray2.length
  
      for (var i = 0; i < finalizedAdditionArray3.length; i++) {
       var atc3 = atc3 + finalizedAdditionArray3[i]
      } 
      AvgAdd3 = atc3/finalizedAdditionArray3.length

      for (var i = 0; i < finalizedSubtractionArray1.length; i++) {
        var stc1 = stc1 + finalizedSubtractionArray1[i]
       } 
       AvgSub1 = stc1/finalizedMultiplicationArray1.length
   
       for (var i = 0; i < finalizedSubtractionArray2.length; i++) {
         var stc2 = stc2 + finalizedSubtractionArray2[i]
        } 
        AvgSub2 = stc2/finalizedSubtractionArray2.length
   
        for (var i = 0; i < finalizedSubtractionArray3.length; i++) {
         var stc3 = stc3 + finalizedSubtractionArray3[i]
        } 
        AvgSub3 = stc3/finalizedSubtractionArray3.length

  }

   finalizeData()

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Multiplication',
      data: [AvgMult1,AvgMult2,AvgMult3], // we want to have no more than three values in this array
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Division',
      data: [AvgDiv1, AvgDiv2, AvgDiv3],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Addition',
      data: [AvgAdd1,AvgAdd2,AvgAdd3],
      backgroundColor: 'rgba(3, 252, 207, 0.5)',
    },
    {
      label: 'Subtraction',
      data: [AvgSub1,AvgSub2,AvgSub3],
      backgroundColor: 'rgba(3, 252, 15, 0.5)',
    },
  ],
};

  const config = {
    type: 'bar',
    data:  [],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const multiplicationTimes = [];
  const divisionTimes = [];






function Menu() {
    return(
        <div className="options">
            <h1>Menu</h1>
            <div className="menu">
            <ul className='menul'>
              <li> <Link to="/Multiplication">Multiplication</Link> </li>
              <li> <Link to="/Division">Division</Link> </li>
              <li> <Link to="/Addition">Addition</Link> </li>
              <li> <Link to="/Subtraction">Subtraction</Link> </li>
            </ul>
        </div>
        <Bar options={{
        y: {
          beginAtZero: true
        }
      }} data={data}/>
        </div>
    );
}

export default Menu;