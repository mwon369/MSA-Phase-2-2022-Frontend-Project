import { useState } from 'react';
import axios from 'axios';
import './App.css';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, Grid, Paper, Skeleton } from "@mui/material";

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
          maxWidth: "100%",
          margin: "0 auto",
          padding: "50px 75px 75px 75px",
        }}>
          <Paper sx={{backgroundColor: "#FAF8F6"}}>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {cardInfo === undefined ? (
                    <h1>Card not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {cardInfo[0].name.charAt(0).toUpperCase() + 
                        cardInfo[0].name.slice(1)}
                      </h1>
                      <p>
                        ID: {cardInfo[0].id}
                        <br />
                        Level: {cardInfo[0].level}
                        <br />
                        Race: {cardInfo[0].race}
                        <br />
                        Type: {cardInfo[0].type}
                        <br />
                        <br />
                        Description: {cardInfo[0].desc}
                        <br />
                        <br />
                        Price on eBay: ${cardInfo[0].card_prices[0].ebay_price}
                        <br />
                        Price on Amazon: ${cardInfo[0].card_prices[0].amazon_price}
                        <br />
                        Price on TCGPlayer: ${cardInfo[0].card_prices[0].tcgplayer_price}
                      </p>
                    </div>  
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {cardInfo[0].card_images[0].image_url ? (
                    <img
                      height="540px"
                      width="360px"
                      alt={cardInfo[0].name}
                      src={cardInfo[0].card_images[0].image_url}
                    ></img>
                  ) : (
                    <Skeleton width={360} height={540}/>  
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
