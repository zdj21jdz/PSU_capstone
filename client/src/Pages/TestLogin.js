import React from "react";
// import { Redirect } from "react-router-dom";
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

import './TestLogin.css';
import { Redirect } from "react-router";

class TestLogin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            hash:'jfdisaojfewnfkdsajienweiak',
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        // console.log(this.props.location);
        // console.log(this.state.username);
    }

    handleInputChange(event) {
        event.preventDefault();
        
        const target = event.target;
    
        this.setState({
            [target.name]: target.value
        });
      }

    handleSubmit(e) {
        e.preventDefault();
        console.log('I was clicked!')

        const postData = {
            submittedUsername: this.state.username,
            submittedPass: this.state.password
        }

        axios.post('http://localhost:5000/logins', 
                    {postData}, {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
            .then(res => {
                console.log(res.data);
                if(res.data==='Invalid Credentials!') {
                    alert(res.data);
                }
                else {
                    console.log('hit here')
                    // this.setState({ redirect: '/home'});
                    this.props.history.push({
                        pathname:'/home',
                        state: {
                            username:this.state.username
                        }
                    })
                }
            });
        }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="submit-form">
    
                <div id="login-icon">
                    <LockOutlinedIcon />
                </div>
                
                <div id="banner">
                    Sign in
                </div>

                <div id="inputs">
                    <form>
                        <label htmlFor="user">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.username}
                        onChange={this.handleInputChange}
                        name="username"
                        />
                    
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        id="pass"
                        required
                        value={this.password}
                        onChange={this.handleInputChange}
                        name="password"
                        />
                        <Button variant="contained" 
                                id="login-btn" 
                                type="submit" 
                                onClick={this.handleSubmit}>
                            Login
                        </Button>
                    </form>
                </div>
                
                <div id="login-help">
                    <div id="Sign-up">
                        <a href=".">Don't have an Account? Sign Up</a>
                    </div>
                </div>
    
                {/* <div id="error-div">
                    {errBody}
                </div> */}
    
            </div>
        );
    }
    
}

export default TestLogin;