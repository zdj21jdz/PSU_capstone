import axios from "axios";

export function changeRadio (e) {
    this.setState({radio: e.target.id});
};

export function handleInputChange(e) {
    e.preventDefault();
    console.log(e);
    
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
        // API Call to check symbol
        if(false) {
            // Code here
            const postData = {
                sym: sym
            }

            axios.post( '/checkstock', 
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
                    // TODO - Suply data to output

                }
            })
            .catch(function (error) {
                if (error.response.status === 403) {
                    alert('User not yet validated - Check your email!')
                } else {
                    // Bouncer for 429 - too many requests
                    alert("An error occured");
                }
            });
        }
        else {
            console.log('Backend in progress')
        }
    }
}

export function handleSell(e) {
    e.preventDefault();

    // Set sell stock
    const stockName = this.state.radio;
    const sellQuantity = this.state.sellQuantity;

    if(stockName === null || sellQuantity === undefined || sellQuantity < 1) {
        alert('Please select a stock and amount to sell!')
    }     
    else {
        // Check if amount is <= total shares held
        const maxQuantity = this.state.jdata.portfolio.stocks[stockName].quantity

        if(sellQuantity <= maxQuantity) {
            console.log('Success!')
        }
        else {
            alert("You only own " + maxQuantity.toString() + " shares of " + stockName
            + ". You can't sell " + sellQuantity.toString() + " shares.")
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
