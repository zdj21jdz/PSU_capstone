import React from "react";
import ZNav from './Custom_Nav/z_nav';
import PageNotFound from "../Pages/NotFound";
import SessionExpired from "../Pages/SessionExpired";

import './dashboard.css';

class BuySell extends React.Component {

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
                        <ZNav username={this.props.location.state.username}
                              tokenExp={this.props.location.state.tokenExp}/>
                    </div>
            
                    <div id='greeting'>
                        <h1>Let's buy some stocks, {this.props.location.state.username}!</h1>
                    </div>
            
                    <div id='user-content'>
                    <div className='content-block' id='user-portfolio'>  
                        <div className='content'>
                            <h1>Buy/Sell Stocks</h1>
                                TODO - Add input form here
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