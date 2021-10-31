// import React, { useEffect, useState } from "react";
import React from "react";
import ZNav from './Custom_Nav/z_nav';
import PageNotFound from "../Pages/NotFound";
import SessionExpired from "../Pages/SessionExpired";

import './dashboard.css';
import UserInsights from './UserInsights';

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
            isLoaded: false,
            items: []
        };
    }

    render() {
        const currTime = Math.floor(Date.now() / 1000);

        try {
            // Check if the token is valid
            if (currTime > this.props.location.state.tokenExp) {
                return <SessionExpired />
            } else {
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
                                <UserInsights passusername={this.props.location.state.username} />
                            </div>
                        </div>
                        <div className='content-block' id='user-insights'>
                            <div className='content'>
                            {mocked_insights(this.props)}
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
export default Dashboard;