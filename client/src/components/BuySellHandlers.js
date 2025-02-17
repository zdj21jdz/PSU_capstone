import axios from "axios";

export function changeRadio (e) {
    this.setState({radio: e.target.id});
};

export function handleInputChange(e) {
    e.preventDefault();
    
    const target = e.target;

    this.setState({
        [target.name]: target.value
    });
};

export function handleBuy(e) {
    e.preventDefault();

    let raw = this.state.searchSymbol;
    let sym = raw.toString().toUpperCase();

    console.log(sym);

    // To Do - query API to check validity of symbol
    if(sym === undefined) {
        alert('Please search for a symbol')
    }
    else {
        
        let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + sym + '&apikey=MWYCIJ7WHBXF94C0'
            
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let buyPrice = data['Global Quote']['05. price'];

            if(buyPrice === null || buyPrice === undefined) {
                alert('Symbol not found!')
            } else {
                this.setState({ buyPrice: buyPrice,
                                buySym:   sym })
            }
        });
    }
}

export function handleSell(e) {
    e.preventDefault();

    // Retrieve sell stock payload data
    const stockName = this.state.radio;
    const sellQuantity = this.state.sellQuantity;
    const uName = this.state.jdata.username

    if(stockName === null || sellQuantity === undefined || sellQuantity < 1) {
        alert('Please select a stock and amount to sell!')
    }     
    else {
        // Check if amount is <= total shares held
        const maxQuantity = this.state.jdata.portfolio.stocks[stockName].quantity

        if(sellQuantity <= maxQuantity) {
            console.log('Success!')
            console.log(stockName, sellQuantity)
            // Create Payload
            const postData = {
                uName: uName,
                submittedSymbol: stockName,
                submittedQuant: sellQuantity,
                maxQuantity: maxQuantity,
                updateType: 'Sell'
            }

            // Send post request
            axios.post('/posts/updatePortfolio',
                    {postData}, {
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    })
                .then(res => {    
                    alert('Sold ' + sellQuantity+ ' share(s) of ' + stockName);
                })  
                .catch(function (error) {
                    alert(error)
                })
        }
        else {
            alert("You only own " + maxQuantity + " shares of " + stockName
            + ". You can't sell " + sellQuantity + " shares.")
        }
    }
}

export function handleSubmit(e) {
    e.preventDefault();

    const postData = {
        submittedUsername: this.state.username,
        submittedPass: this.state.password
    }

    axios.post( '/buysell', 
                {postData}, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
        .then(res => {
            if(res.data==='Invalid Credentials!') {
                alert(res.data);
            }
            else {
                // Set token exp
                const tokenExp = Math.floor(Date.now() / 1000) + (60*60)
                
                // Set the user's auth state
                setTimeout(() =>
                    this.props.history.push({
                    pathname:'/home',
                    state: {
                        username: this.state.username,
                        loggedIn: true,
                        token: res.data,
                        tokenExp: tokenExp
                    }
                }), 500);
            }
        })
        .catch(function (error) {
            if (error.response.status === 403) {
                alert('User not yet validated - Check your email!')
            } else {
                // Bouncer for 429 - too many requests
                alert("Too many bad attempts! Please wait a few minutes");
            }
        });
}
