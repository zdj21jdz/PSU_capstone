import React from "react";

import './dashboard.css';
import axios from "axios";

class NewUserInsights extends React.Component {
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
    
        axios.post('/posts/userInsight',
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
    }

    render() {
        const {isLoaded, jdata } = this.state; 
        
        if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else if (jdata === null || jdata === undefined) {
            return <div>You don't have any stocks yet!</div>
        }
        else {
            // Prep insights
            var insightKeys = Object.keys(jdata.insights)
            console.log(insightKeys)

            return (
            <div>
                {/* {jdata.insights.Software} */}
                <h3>Based on the industries in your portfolio,</h3>
                <h3>you may also like these stocks:</h3>
                {Object.keys(jdata.insights).map(function(keyName) {
                    return (
                        <ul key={keyName} style={{'list-style-position': "inside"}}>
                            <li>{keyName}</li>
                                <ul>
                                <li>{jdata.insights[keyName][0]}</li>
                                <li>{jdata.insights[keyName][1]}</li>
                                <li>{jdata.insights[keyName][2]}</li>
                                </ul>
                        </ul>
                    )
                })}
            </div>
              
            );
        }
    }
}

export default NewUserInsights;