import axios from "axios";

export function mock_login(username, password) {
    const postData = {
        submittedUsername: username,
        submittedPass: password
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
                // alert(res.data);
            }
            else {
                console.log('Success')
            }
        });
};