import axios from "axios";

export function mock_insights(username) {
    const postData = {
        uName: username
    }

    axios.post('http://localhost:5000/posts', 
                {postData}, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                  })
        .then(res => {
            console.log(res.data);
        });
};