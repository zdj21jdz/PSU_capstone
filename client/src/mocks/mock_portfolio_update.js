// Mocks AXIOS API call with dummy data

import axios from "axios";

export function mock_portfolio_update(data) {
    const postData = {
        submittedSymbol: data.sym,
        submittedPrice: data.price
    }
    
    axios.post('http://localhost:5000/posts', 
            {postData}, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
        .then(res => {
            return ('Update Successful!');
        });
};