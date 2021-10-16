import axios from "axios";

export function mock_login(username, password, attempt=1) {
    const postData = {
        submittedUsername: username,
        submittedPass: password
    }

    if (attempt == 3) {
        axios.post('http://localhost:5000/logins', 
                {postData}, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
            .then(res => {
                if(res.data==='Invalid Credentials!') {
                    console.error();
                }
            })
            .catch(function (error) {
                // Bouncer for 429 - too many requests
                alert("Too many bad attempts! Please wait a few minutes");
            });
        
    }
    else {
        axios.post('http://localhost:5000/logins', 
                {postData}, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
            .then(res => {
                if(res.data==='Invalid Credentials!') {
                    // alert(res.data)
                }
            });
    }
    
};