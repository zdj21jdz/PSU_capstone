// import React, { useEffect, useState } from "react";
import React from "react";
import ZNav from './Custom_Nav/z_nav';
import PageNotFound from "../Pages/NotFound";

import './dashboard.css';
import UserInsights from './UserInsights';


function mocked_data(props) {
    if (props.location.state.username ==='test') {
        return (
            <div>
                <ul id='stock_listings'>
                    <h5>APPL: Current value held: $800.00</h5>
                    <li>
                        Current Price: $400.00
                    </li>
                    <li>
                        Total Shares: 2
                    </li>
                </ul>
                <ul id='stock_listings'>
                    <h5>MSFT: Current value held: $4000.00</h5>
                    <li>
                        Current Price: $400.00
                    </li>
                    <li>
                        Total Shares: 10
                    </li>
                </ul>
            </div>
        )
    }
    if (props.location.state.username ==='test_xyz') {
        return (
            <div>
                <ul id='stock_listings'>
                    <h5>BOIL: Current value held: $800.00</h5>
                    <li>
                        Current Price: $8.00
                    </li>
                    <li>
                        Total Shares: 100
                    </li>
                </ul>
                <ul id='stock_listings'>
                    <h5>KOLD: Current value held: $740.00</h5>
                    <li>
                        Current Price: $74.00
                    </li>
                    <li>
                        Total Shares: 10
                    </li>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                Error Loading Data!
            </div>
        )
    }
}

function mocked_insights(props) {
    if (props.location.state.username ==='test') {
        return (
            <div>
                <ul id='stock_listings'>
                    <h4><b>APPL insights</b></h4>
                    <p>
                        Apple is a tech firm based out of California, and has....
                    </p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>

                    <h5><b>Stocks like APPL</b></h5>
                    <p>
                        MSFT, NVDA, TSLA, FB, LYFT, UBER..
                    </p>
                </ul>
                <ul id='stock_listings'>
                    <h4><b>MSFT insights</b></h4>
                    <p>
                        Microsoft is a tech firm based out of Washington state, and has...
                    </p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>
                    <p>bla bla bla</p>

                    <h5><b>Stocks like MSFT</b></h5>
                    <p>
                        AAPL, NVDA, TSLA, FB, LYFT, UBER..
                    </p>
                </ul>
            </div>
        )
    }
    if (props.location.state.username ==='test_xyz') {
        return (
            <div>
                <ul id='stock_listings'>
                    <h4><b>BOIL insights</b></h4>
                    <p>
                        BOIL is a leveraged ETF for natural gas, and has..
                    </p>
                    <p>BOIL has notable changes due to seasonality!</p>
                    <p>bla bla bla</p>

                    <h5><b>Stocks like BOIL</b></h5>
                    <p>
                        KOLD, BP, RDS.A...
                    </p>
                </ul>
                <ul id='stock_listings'>
                    <h4><b>KOLD insights</b></h4>
                    <p>
                        KOLD is a leveraged Short ETF for natural gas, and has.. 
                    </p>
                    <p>KOLD has notable changes due to seasonality!</p>
                    <p>bla bla bla</p>

                    <h5><b>Stocks like KOLD</b></h5>
                    <p>
                        BOIL, BP, RDS.A...
                    </p>
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>
                Error Loading Data!
            </div>
        )
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            tUname: 'test',
            isLoaded: false,
            items: []
        };

        console.log(this.state.tUname)
    }

    render() {
        // For Redirecting if user is unauthenticated
        try {
            return (
                <>
        
                <div>
                    <ZNav username={this.props.location.state.username}/>
                </div>
        
                <div id='greeting'>
                    <h1>Good Morning, {this.props.location.state.username}!</h1>
                </div>
        
                <div id='user-content'>
                    <div className='content-block' id='user-portfolio'>  
                        <div className='content'>
                            <h1>{this.props.location.state.username}'s Portfolio</h1>
                            {mocked_data(this.props)}
                        </div>
                    </div>
                    <div className='content-block' id='user-insights'>
                        <div className='content'>
                        {mocked_insights(this.props)}
                        </div>
                    </div>
                    <div className='content-block' id='user-insights'>
                        <div className='content'>
                        <UserInsights passusername={this.props.location.state.username} />
                        </div>
                    </div>
                </div>
                
                </>
            );
        } catch (error) {
            return <PageNotFound />
        }
        
    }
};

export default Dashboard;