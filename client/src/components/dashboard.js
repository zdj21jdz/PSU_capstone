import React, { useState } from "react";
import ZNav from './Custom_Nav/z_nav';

import './dashboard.css';

// Main landing page after a user has logged in

function LoadUserData(uName) {
    console.log('first Call');

    const [portfolio, setPortfolio] = useState(null);
    const api_base = 'http://localhost:5000/posts'

    fetch(api_base, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uName: uName
        })
    })
        .then(res => res.text())
        .then(data => setPortfolio(data))

    console.log('retrieved data');

    return (
        <div>{portfolio}</div>
    )
}

function Dashboard(props) {

    const username = props.username;
    const userData = LoadUserData(username);

    return (
        <>

        <div>
            <ZNav username={username}/>
        </div>

        <div id='greeting'>
            <h1>Good Morning, {username}!</h1>
        </div>

        <div id='user-content'>
            <div className='content-block' id='user-portfolio'>  
                <div className='content'>
                    {userData}
                </div>
            </div>
            <div className='content-block' id='user-insights'>
                <div className='content'>
                    Hold for Insights
                </div>
            </div>
        </div>
        
        </>
    );
};

export default Dashboard;