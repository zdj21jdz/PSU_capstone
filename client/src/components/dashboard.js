// import React, { useEffect, useState } from "react";
import React from "react";
import ZNav from './Custom_Nav/z_nav';
import PageNotFound from "../Pages/NotFound";
import SessionExpired from "../Pages/SessionExpired";

import './dashboard.css';
import UserInsights from './UserInsights';
import NewUserInsights from './NewUserInsights';

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
                        <ZNav username={this.props.location.state.username}
                              tokenExp={this.props.location.state.tokenExp}/>
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
                                <NewUserInsights passusername={this.props.location.state.username} />
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