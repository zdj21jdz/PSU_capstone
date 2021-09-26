import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import './TestLogin.css';

function TestLogin() {
    let history = useHistory();

    const initialUserState = {
      name: "",
      pass: "",
    };
    
    const [user, setUser] = useState(initialUserState);
    const [errMsg, setErrMsg] = useState(null)
    
    const handleInputChange = event => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    };

    const handleSubmit = () => {
        const username = user.name;
        const password = user.pass;

        // console.log(username, password);

        // TODO - Will need to update when live
        const api = 'http://localhost:5000/logins'
        fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                submittedUsername: username,
                submittedPass: password,
            })
        })
            .then(res => res.text())
            .then(data => {
                if(data==='true') {
                    history.push("/home");
                } else {
                    setErrMsg(data);
                }
            })
    };

    const errBody = (errMsg !== null ? <code style={{'marginTop': '20px', 'padding': '0 20px'}}>{errMsg}</code> : null)

    return (
        <div className="submit-form">

            <div id="login-icon">
                <LockOutlinedIcon />
            </div>
            
            <div id="banner">
                Sign in
            </div>

            <label htmlFor="user">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
        
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              required
              value={user.password}
              onChange={handleInputChange}
              name="pass"
            />

            <Button variant="contained" id="login-btn"
                onClick={handleSubmit}>
                    Login
            </Button>
            
            <div id="login-help">
                <div id="Sign-up">
                    <a href=".">Don't have an Account? Sign Up</a>
                </div>
            </div>

            <div id="error-div">
                {errBody}
            </div>

        </div>
    );
}

export default TestLogin;