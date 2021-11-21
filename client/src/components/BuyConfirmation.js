import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";

// TODO - create OnSubmit function that buys stocks

function handleStockBuy(e) {
    e.preventDefault();

    let amount = document.getElementById('purchaseQuant').value;
    let sym = document.getElementById('searchSymbol').value.toString().toUpperCase();

    console.log(amount,sym);

    // // To Do - shoot off API call to add stocks to portfolio
    if(amount > 0 && sym !== null && sym !== undefined) {
        // TODO - Post to db
        console.log('stock purchased!')
        
        let userName = this.props.passusername;

        // Set up Post
        const submittedSymbol = sym;
        const submittedPrice = amount;

        const postData = {
            uName: userName,
            submittedSymbol: submittedSymbol,
            submittedPrice: submittedPrice
        }
    
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
            <p style={{ color: "#fffffff2" }}>Ticker {props.buySym} is: ${props.buyPrice}/share</p>
            <p style={{ color: "#fffffff2" }}>How many shares would you like to purchase {props.buySym}?</p>
            <input type="number"
                    min="0"
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