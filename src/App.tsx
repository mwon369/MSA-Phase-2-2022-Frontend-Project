import { useState } from 'react';
import axios from 'axios';
import './App.css';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function App() {
  // create a state variable, "cardName", which will be altered with its corresponding state function, "setCardName"
  const[cardName, setCardName] = useState("");
  const[cardInfo, setCardInfo] = useState<undefined | any>(undefined);

  // URL to make the API request
  const BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

  return (
    <div>
      <h1>Yu-Gi-Oh Card Search</h1>
      
      <div>
        <TextField 
          id="outline-basic" 
          label="Enter a Yugioh Card Name"
          variant="outlined"
          className="text"
          value={cardName}
          placeholder="Search..."
          size="small"
          onChange={(prop) => {
            setCardName(prop.target.value);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              search();
            }
          }}/>

          <IconButton
            aria-label="search"
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{fill: "black"}} />
          </IconButton>
      </div>
      
      {/** if the card is not found, notify the user */}
      {cardInfo === undefined ? (
        <p></p>
      ) : (
      /** else display the card image to the user */
        <div id="card-result" className="card-result" 
          style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "25px 100px 0px 100px",
        }}>
          <img src={cardInfo[0].card_images[0].image_url} alt="" />
          <div className="card-prices">
            <p>Price on TCGPlayer: ${cardInfo[0].card_prices[0].tcgplayer_price}
            <br />
              Price on eBay: ${cardInfo[0].card_prices[0].ebay_price}
            <br />
              Price on Amazon: ${cardInfo[0].card_prices[0].amazon_price}
            </p>
          </div>
          <div className="card-description">
            <p>Description: 
            <br /> 
              {cardInfo[0].desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  function search() {
    axios.get(BASE_URL + `?name=${cardName}`).then((response) => {
      /** filter the response down to the relevant card data */
      const cardData = response.data.data;
      console.log(cardData);
      setCardInfo(cardData);
    })
    .catch((error) => {
      console.log("Card not found");
      alert("Card not found! Please ensure you spelled the name correctly.");
      setCardInfo(undefined);
    });
  }
}


export default App;
