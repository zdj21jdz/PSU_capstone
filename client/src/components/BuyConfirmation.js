import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";

// TODO - create OnSubmit function that buys stocks
function handleStockBuy(e) {
    e.preventDefault();
    
    console.log(e)

    let amount = document.getElementById('purchaseQuant').value;
    let price = document.getElementById('Pricex').innerHTML;
    let sym = document.getElementById('searchSymbol').value.toString().toUpperCase();
    let uName = document.getElementById('uNamex').innerHTML.toString().slice(11);

    // // To Do - shoot off API call to add stocks to portfolio
    if(amount > 0 && sym !== null && sym !== undefined) {
        // TODO - Post to db
        console.log('stock purchased!')

        // Set up Post
        const postData = {
            uName: uName,
            submittedSymbol: sym,
            submittedQuant: amount,
            submittedPrice: price,
            updateType: 'Buy'
        }
    
        // Send purchase request
        axios.post('/posts/updatePortfolio',
                {postData}, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
        .then(res => {    
            alert('Stock Purchased')
        })  
        .catch(function (error) {
            alert(error)
        })
    } else {
        alert('Please select a quantity to purchase')
    }
}

const BuyConfirmation = props => {

    if(props.buyPrice !== undefined && props.buyPrice !== null
        && props.buySym !== null) {
        return (
            <>
            <p style={{ color: "#fffffff2" }}>Ticker {props.buySym} has the current per share value of: </p>
            <p id='Pricex' style={{ color: "#fffffff2" }}>{props.buyPrice}</p>
            <p id='uNamex' style={{ color: "#fffffff2" }}>Thank you, {props.passusername}</p>
            <p style={{ color: "#fffffff2" }}>How many shares would you like to purchase {props.buySym}?</p>
            <input type="number"
                    min="1"
                    name="purchaseQuant"
                    id="purchaseQuant">
            </input>
            <Button variant="contained" 
                    id="login-btn" 
                    type="submit"
                    onClick={handleStockBuy} >
                Purchase shares of {props.buySym}
            </Button>
            </>
        )
    } else { return null }
}

export default BuyConfirmation;