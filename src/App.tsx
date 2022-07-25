import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // create a state variable, "cardName", which will be altered with its corresponding state function, "setCardName"
  const[cardName, setCardName] = useState("");

  // URL to make the API request
  const BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

  return (
    <div>
      <h1>
        Yu-Gi-Oh Card Search
      </h1>
      
      <div>
        <label>Card Name</label>
        <br/>
        <input 
         type="text" 
         id="card-name"
         name="card-name"
         onChange={e => setCardName(e.target.value)}
         onKeyPress={e => {
            if (e.key === 'Enter') {
              search()
            }
         }}/>
         <br/>
        <button onClick={search}>Search</button>
      </div>

      <p>You have entered {cardName}</p>
      <div id="card-result">This will show the result</div>

    </div>
  );

  function search() {

  }
}


export default App;
