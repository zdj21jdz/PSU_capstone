import React from "react";
import Button from '@mui/material/Button';
import axios from 'axios';

// Custom CSS files
import './TestLogin.css';

// NewUser Page
class NewUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            confirmPassword: '',
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match!");
        } else {
            const postData = {
                submittedUsername: this.state.username,
                submittedPass: this.state.password,
                submittedEmail: this.state.email
            }

            // Submit email verification
            axios.post('/verifyEmail',
                        {postData}, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                .then(res => {
                    alert(res.data);
                })
                .catch(function(error) {
                    console.log(error)

                    if (error.response.status === 401) {
                        alert('Please choose a different Username')
                    } 
                    else if (error.response.status === 400) {
                        alert('Invalid Email')
                    } else {
                        alert('Internal Server Error')
                    }
                    

                })
        }
    }

    render() {
        return (
            <div className="submit-form">
                <div id="banner">
                    New User Sign Up
                </div>

                <div id="inputs">
                    <form>
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={this.email}
                        onChange={this.handleInputChange}
                        name="email"
                        />

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

                        <label htmlFor="Confirmpassword">Confirm Password</label>
                        <input
                        type="Password"
                        className="form-control"
                        id="confPass"
                        required
                        value={this.confirmPassword}
                        onChange={this.handleInputChange}
                        name="confirmPassword"
                        />
                        <Button variant="contained" 
                                id="login-btn" 
                                type="submit" 
                                onClick={this.handleSubmit}>
                            Sign Up
                        </Button>
                    </form>
                </div>

                <div id="login-help">
                    <div id="Sign-up">
                        <a href="/">Back to Home Page</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default NewUser;