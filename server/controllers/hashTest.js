import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// // From jwtgen
// const JwtGen = (username) => {
//     const secret = process.env.JWT_SECRET;

//     const token = jwt.sign({
//         "username": username,
//         "iat": Math.floor(Date.now() / 1000)
//       }, secret,
//       { expiresIn: '1h'});
    
//     return token;
// }

const secret = process.env.JWT_SECRET;


// // Create a token
// const token = JwtGen('test');

// console.log(token);

// // Try decoding the token
// const decoded = jwt.verify(token,secret);
// console.log(decoded);

// Test token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2MzU2MjMzOTUsImV4cCI6MTYzNTYyNjk5NX0.Hxm-zX2s9pVyNtLnog5vsCgLOI--yG7tvO9sbSoou4A'

// Decode from the webpage
const web_JWT = jwt.verify(token,secret);
console.log(web_JWT);

function CheckJwt(token, uname) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const timeCheck = Math.floor(Date.now() / 1000);
    
    // Ensure token has not expired, username is correct, token expires in 1 hr
    if (data.exp > timeCheck && data.username == uname && (data.exp - data.iat == 3600)) {
        return true;
    } else {
        // Token is incorrect or expired
        return false;
    }
}
console.log(CheckJwt(token,'test'));

// const hash = crypto.createHmac('sha256', secret)
//                .update('I love cupcakes') // payload
//                .digest('hex'); // how to read out in string// hex in this case

// console.log(hash);


