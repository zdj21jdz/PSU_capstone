import axios from "axios";

export function mock_newUser(username, password, email) {
    const postData = {
        submittedUsername: username,
        submittedPass: password,
        submittedEmail: email
    }
    axios.post('http://localhost:5000/verifyEmail', 
            {postData}, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
        .then(res => {
                console.log('Email Sent! User is created. Currently working on validation')
            });
};