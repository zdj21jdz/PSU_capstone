import React from "react";

import './dashboard.css';
import axios from "axios";

class UserInsights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tUname: 'test',
            isLoaded: false,
            jdata: null
        };
    }

    componentDidMount() {

        let userName = this.props.passusername;
        
        console.log('Loading user data')
        console.log(this.props.passusername)
    
        axios.post('/posts',
                {uName: userName}, {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
        .then(res => {
            console.log('load_user_data');
            console.log(res.data);
    
            this.setState({
                isLoaded: true,
                jdata: res.data
            })
        })  
    }

    render() {
        const {isLoaded, jdata } = this.state; 
        
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <div>
                {Object.keys(jdata.portfolio.stocks).map((stock) => {
                    var stockPrice = jdata.portfolio.stocks[stock].current_price;
                    var stockQuant = jdata.portfolio.stocks[stock].quantity;
    
                    var totalValue =  stockPrice * stockQuant;
                    return (
                        <ul key={stock} id='stock_listings'>
                            <h5>{stock}: Current value held: ${totalValue}</h5>
                            <li>
                                Current Price: ${jdata.portfolio.stocks[stock].current_price}
                            </li>
                            <li>
                                Total Shares: {jdata.portfolio.stocks[stock].quantity}
                            </li>
                        </ul>
                    )
                })}
            </div>
              
            );
        }
    }
}

export default UserInsights;