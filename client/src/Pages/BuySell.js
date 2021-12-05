import React from "react";
import ZNav from '../components/Custom_Nav/z_nav';
import PageNotFound from "./NotFound";
import SessionExpired from "./SessionExpired";
import Button from '@mui/material/Button';
import axios from "axios";
import * as zhandle from '../components/BuySellHandlers';
import BuyConfirmation from '../components/BuyConfirmation';

import './buysell.css';

class BuySell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jdata: null,
            radio: null,
            buyPrice: null,
            buySym: null
        };

        this.handleSubmit = zhandle.handleSubmit.bind(this);

        // For each button
        this.handleBuy = zhandle.handleBuy.bind(this);
        this.handleSell = zhandle.handleSell.bind(this);

        // For all inputs on page
        this.handleInputChange = zhandle.handleInputChange.bind(this);

        // Radio button binding
        this.changeRadio = zhandle.changeRadio.bind(this);
    }

    componentDidMount() {

        let userName = this.props.location.state.username;
    
        axios.post('/posts',
                {uName: userName}, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
        .then(res => {    
            this.setState({
                isLoaded: true,
                jdata: res.data
                })
            })
        .catch(function (error) {
            console.log(error)
        })
    }

    render() {
        const currTime = Math.floor(Date.now() / 1000);
        const { jdata } = this.state; 

        try {
            // Check if the token is valid
            if (currTime > this.props.location.state.tokenExp) {
                return <SessionExpired />
            } else {
                return (
                    <>
                    <div>
                        <ZNav username={this.props.location.state.username}
                              tokenExp={this.props.location.state.tokenExp}/>
                    </div>
            
                    <div id='greeting'>
                        <h1>Let's buy some stocks, {this.props.location.state.username}!</h1>
                    </div>
            
                    <div id='user-content'>

                        {/* Buy Stocks */}
                    <div className='content-block'>  
                        <div className='content'>
                            <h1>Buy Stocks</h1>
                            <div id="inputs">
                                <form>
                                    <label htmlFor="searchSymbol">Search for a Symbol</label>
                                    <input
                                    type="integer"
                                    className="form-control"
                                    id="searchSymbol"
                                    required
                                    value={this.buySymbol}
                                    onChange={this.handleInputChange}
                                    name="searchSymbol"
                                    />
                                    <Button variant="contained" 
                                            id="login-btn" 
                                            type="submit" 
                                            onClick={this.handleBuy}>
                                        Check for symbol
                                    </Button>
                                </form>
                            </div>
                            <BuyConfirmation 
                                buyPrice={this.state.buyPrice}
                                buySym = {this.state.buySym}
                                passusername = {this.state.jdata.username} />
                        </div>
                    </div>

                    <div className='content-block'>  
                        {/* Sell Stocks */}
                        <div className='content'>
                            <h1>Sell Stocks</h1>
                            <div id="inputs">
                                <form>
                                    {Object.keys(jdata.portfolio.stocks).map((stock) => {
                                        return (
                                            <>
                                            <input type="radio" 
                                                    id={stock} 
                                                    name="radio" 
                                                    value={stock}
                                                    onChange={this.changeRadio} >
                                            </input>
                                            <label htmlFor={stock}>{stock}</label><br></br>
                                            </>
                                        )
                                    })}
                                    <label htmlFor="sellQuantity">Specify Amount</label>
                                    <input
                                    type="number"
                                    className="form-control"
                                    id="sellQuantity"
                                    required
                                    value={this.sellSymbolQuantity}
                                    onChange={this.handleInputChange}
                                    name="sellQuantity"
                                    min="1"
                                    max="20"
                                    />
                                    <Button variant="contained" 
                                            id="login-btn" 
                                            type="submit" 
                                            onClick={this.handleSell}>
                                        Sell Stock(s)
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='content-block'>  
                        {/* Portfolio */}
                        <div className='content'>
                            <h2>Current Portfolio</h2>
                                <div>
                                    {Object.keys(jdata.portfolio.stocks).map((stock) => {
                                        var stockPrice = jdata.portfolio.stocks[stock].current_price;
                                        var stockQuant = jdata.portfolio.stocks[stock].quantity;
                                        var totalValue =  stockPrice * stockQuant;
                                        
                                        return (
                                            <ul id='stock_listings' key={stock+'ul'}>
                                                <h5 key={stock+"h5"}>{stock} - {stockQuant} shares @ ${stockPrice}/share</h5>
                                                <li key={stock}>
                                                    Current value held: ${totalValue}
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>

                    </div>
                    </>
                )
            }
        } catch (error) {
            return <PageNotFound />
        }
    }
};

export default BuySell;